export interface ProjectResponse {
  data: ProjectModel[];
  meta: Meta;
}

export interface ProjectModel {
  id: number;
  attributes: ProjectAttributes;
}

export interface ProjectModelWithDeveloperName extends ProjectModel {
  developerName: string;
}

export interface ProjectAttributes {
  Title: string;
  Handover?: string;
  YoutubeURL?: string;
  Address: string;
  Developer: string;
  Amenities?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: Date;
  locale: string;
  Location_link: string;
  Meta_title: string;
  Meta_description: string;
  Project_type?: string[];
  Towers: string;
  Unit_variants: string;
  Land_area: string;
  Thumbnail_paragraph: string;
  Starting_price: number;
  Status: string;
  Content: string;
  In_a_nutshell: string;
  In_a_nutshell_content: string;
  Atmosphere_headline: null;
  Atmosphere_paragraph: string;
  Location_paragraph: string;
  Big_title: string;
  Hero_paragraph: string;
  Main_image: AtmosphereImage;
  Brochure: AtmosphereImage;
  Images: Images;
  Atmosphere_image: AtmosphereImage;
  Floor_plans: FloorPlan[];
  Payment_plans: PaymentPlan;
  area_ID: AtmosphereImage;
  developer_ID: AtmosphereImage;
  Logo?: AtmosphereImage;
  Subtitle_1?: string;
  Description_1?: string;
  Content_image?: AtmosphereImage;
  Subtitle_2?: string;
  Description_2?: string;
  Project_number: ProjectNumber;
  Nearby_places: NearbyPlaces;
}

interface ProjectNumber {
  Project_number: string;
  QR: AtmosphereImage;
}

export interface NearbyPlaces {
  id: number;
  Place: Place[];
}

interface Place {
  id: number;
  Place_name: string;
  Place_distance: string;
}
interface DataAttributes {
  url?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  Area_name?: string;
  slug?: string;
  Name?: string;
  Logo?: AtmosphereImage;
}

interface DataClass {
  id: number;
  attributes: DataAttributes;
}

interface Images {
  data: DataDatum[];
}

interface AtmosphereImage {
  data: DataClass;
}

interface DataDatum {
  id: number;
  attributes: FluffyAttributes;
}

interface FluffyAttributes {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface FloorPlan {
  id: number;
  Type: string;
  Starting_price: string;
  Size: string;
  Unit_type: string;
  Floor_plan_image: AtmosphereImage;
}

export interface PaymentPlan {
  id: number;
  Down_payment_percentage?: number;
  During_construction_percentage?: number;
  On_handover_percentage?: number;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}