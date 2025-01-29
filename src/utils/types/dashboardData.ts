export interface Info {
  id: string;
  resource_type: string;
  priority: string;
  status: string;
  created_at: string;
  Language: {
    Language: string;
  };
  resource_level_link: {
    resource_level: number;
  }[];
}

export interface IResource {
  Language: string;
  Info: Info;
}

export interface IResourceType {
  id: number;
  type: string;
  color: string;
  resourceType: string;
  height: string;
  children?: IResourceType[];
  sub_item?: IResourceType[];
  parent_item: string | null;
}
export interface IFormattedData {
  [language: string]: {
    Info: {
      ResourceType: string;
      ResourceLevel: any;
      Priority: string;
      Status: string;
    }[];
  };
}
