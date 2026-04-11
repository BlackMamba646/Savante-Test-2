export interface PropertyPageResponse {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Operation_tag: string;
	Price_tag: string;
	Specs_title: string;
	Type_tag: string;
	Size_tag: string;
	Bedrooms_tag: string;
	Bathrooms_tag: string;
	Description_title: string;
	Location_title: string;
	Features_title: string;
	Amenities_title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Similar_properties: SimilarProperties;
	localizations: Localizations;
}

interface SimilarProperties {
	id: number;
	Title: string;
	CTA: string;
}

interface Localizations {
	data: any[];
}

interface Meta {}