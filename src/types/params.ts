export interface PropertySearchParams {
  q?: string;               // Búsqueda por nombre o dirección
  status?: string;          // "ready-to-move" | "new-developments"
  property_type?: string;   // "apartment" | "villa" | "townhouse", etc. (mantelón separado)
  beds?: string;            // "1" | "2" | "3" | "4" | "5"
  baths?: string;           // "1" | "2" | "3" | "4" | "5"
  price_min?: string;       // Precio mínimo
  price_max?: string;       // Precio máximo
  size_min?: string;        // Tamaño mínimo en sqft
  size_max?: string;        // Tamaño máximo en sqft
  garage?: string;          // Número de garajes
  page?: string;            // Número de página
  limit?: string;           // Items por página (default: 12)
  developer?: string;       // Slug del desarrollador
  area?: string;            // Slug del área
  sort?: string;            // "newest" | "oldest" | "price-asc" | "price-desc"
}

export interface ProjectSearchParams {
  q?: string;
  status?: string;
  project_type?: string;
  beds?: string;
  baths?: string;
  price_min?: string;
  price_max?: string;
  size_min?: string;
  size_max?: string;
  garage?: string;
  page?: string;
  limit?: string;
  developer?: string;
  area?: string;
  sort?: string;
}

export interface DevelopersSearchParams {
  q?: string;                    // Búsqueda por nombre
  page?: string;                 // Número de página
  sort?: string;                 // "more-projects" | "fewer-projects"
  developersByArea?: string;     // Filtro por área
  completionStatus?: string;     // "ready-to-move" | "new-developments"
}

export interface AgentListingSearchParams {
  q?: string;         // Búsqueda por nombre
  page?: string;      // Número de página
  sort?: string;      // Ordenamiento (si aplica)
  language?: string;  // "english" | "hindi" | "russian", etc.
  role?: string;      // "ceo" | "sales-manager", etc.
}

export interface AreasSearchParams {
  q?: string;      // Búsqueda por nombre de área
  page?: string;   // Número de página
  sort?: string;   // "highest" | "lowest" (precio)
}

export interface SimpleListingSearchParams {
  page?: string;   // Número de página
  sort?: string;   // Ordenamiento
}