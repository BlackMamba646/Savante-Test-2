export interface DevelopersFilters {
  sort?: string;
  developersByArea?: string;
  completionStatus?: string;
}

export interface PropertyFilters {
  beds?: string | number;
  baths?: string | number;
  property_type?: string | number;
  price_min?: string | null;
  price_max?: string | null;
  size_min?: string | null;
  size_max?: string | null;
  area?: string;
}

export interface ProjectFilters {
  developer?: string;
  project_type?: string;
  status?: string;
  price_min?: string | null;
  price_max?: string | null;
  area?: string;
}