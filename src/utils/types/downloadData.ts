export interface RegionDataProps {
  id: number;
  language_name: string;
  language_code: string;
  region: string;
  country: string;
  first_language_pop: number;
}

export interface LanguageDataProps {
  id: string;
  language: string;
  resource_level?: string;
}
