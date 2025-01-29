CREATE OR REPLACE FUNCTION get_points_in_regions(languages text[], regions text[])
RETURNS jsonb AS $$
DECLARE
    result_json jsonb;
    all_access_statuses text[];
BEGIN
    -- Aggregate all_access_status values into an array
    SELECT ARRAY_AGG(all_access_status::text) INTO all_access_statuses
    FROM minor_languages
    WHERE language_name IN (
        SELECT DISTINCT pt.language_name
        FROM major_languages_buffered cp
        LEFT JOIN minor_languages pt ON ST_Within(
            ST_SetSRID(
                ST_MakePoint(
                    CAST(pt.longitude AS numeric),
                    CAST(pt.latitude AS numeric)
                ),
                4326
            ),
            cp.geometry
        )
        LEFT JOIN region cb ON ST_Within(
            ST_SetSRID(
                ST_MakePoint(
                    CAST(pt.longitude AS numeric),
                    CAST(pt.latitude AS numeric)
                ),
                4326
            ),
            cb.border_geometry
        )
        WHERE cp."language" = ANY(languages)
        AND cb."region" = ANY(regions)
    );

    -- Create the result JSON
    SELECT JSONB_BUILD_OBJECT(
        'minor_languages', JSONB_AGG(DISTINCT pp.language_name),
        'sum_minor_languages', COUNT(DISTINCT pp.language_name),
        'population', SUM(pp.first_language_pop),
        'all_access_status', all_access_statuses
    ) INTO result_json
    FROM (
        SELECT DISTINCT pp.language_name, pp.first_language_pop
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
        LEFT JOIN region cb ON ST_Within(
            ST_SetSRID(
                ST_MakePoint(
                    CAST(pp.longitude AS numeric),
                    CAST(pp.latitude AS numeric)
                ),
                4326
            ),
            cb.border_geometry
        )
        WHERE cp."language" = ANY(languages)
        AND cb."region" = ANY(regions)
    ) pp;

    RETURN result_json;
END;
$$ LANGUAGE plpgsql;
