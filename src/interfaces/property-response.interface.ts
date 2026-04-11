export interface PropertyResponse {
  data: PropertyModel[];
  meta: Meta;
}

export interface PropertyModel {
  id: number;
  attributes: PropertyAttributes;
}

export interface PropertyAttributes {
  Title: string;
	Description: string;
	Price: string;
	Total_area: string;
	Bedrooms: number;
	Bathrooms: number;
	Operation: string;
	YoutubeURL: string;
	MatterportURL: string;
	Property_type: string;
	Address: string;
	Location: string;
	Amenities: string[];
	Features: string[];
	slug: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Main_image: MainImage;
	Images: Images;
	area_ID: AreaID;
}

interface AreaID {
	data: {
		id: number;
		attributes: {
			Area_name: string;
			slug: string;
		};
	};
}

interface Images {
	data: DAT[];
}

interface DAT {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	url: string;
}

interface MainImage {
	data: DAT;
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