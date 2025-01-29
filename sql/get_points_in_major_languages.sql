CREATE OR REPLACE FUNCTION get_points_in_major_languages(languages text[])
RETURNS jsonb AS $$
DECLARE
    result_json jsonb;
BEGIN
    -- Create the result JSON
    SELECT JSONB_BUILD_OBJECT(
        'minor_languages', JSONB_AGG(DISTINCT pp.language_name),
        'sum_minor_languages', COUNT(DISTINCT pp.language_name),
        'population', SUM(pp.first_language_pop),
        'all_access_status', JSONB_AGG(JSONB_BUILD_OBJECT(
            'all_access_status', pp.all_access_status,
            'first_language_pop', pp.first_language_pop
        ))
    ) INTO result_json
    FROM (
        SELECT DISTINCT pp.language_name, pp.first_language_pop, pp.all_access_status
        FROM major_languages_buffered cp
        LEFT JOIN minor_languages pp ON ST_Within(
            ST_SetSRID(
                ST_MakePoint(
                    CAST(pp.longitude AS numeric),
                    CAST(pp.latitude AS numeric)
                ),
                4326
            ),
            cp.geometry
        )
        WHERE cp."language" = ANY(languages)
    ) pp;

    RETURN result_json;
END;
$$ LANGUAGE plpgsql;