export type SortedScore =
  | {
      [language: string]: {
        Level: number;
        Score: number;
      };
    }[]
  | null;
export interface Point {
  id: string;
  geometry: Geometry;
  fid: number;
  iso: string;
  language_name: string;
  latitude: number;
  longitude: number;
  language_code: string;
  country: string;
  region: string;
  continent: string;
  first_language_pop: number;
  first_language_pop_grp: string;
  need_expressed: string;
  on_all_access_list: string;
  all_access_status: string;
  all_access_pop_grp: string;
  scripture_product_summary: string;
  confidence_score: string;
  sorted_confidence_score: any;
}
export interface Geometry {
  type: string;
  crs: Crs;
  coordinates?: number[] | null;
}
export interface Crs {
  type: string;
  properties: Properties;
}
export interface Properties {
  name: string;
}
