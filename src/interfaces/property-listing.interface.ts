export interface PropertyListingResponse {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Cant_find: CantFind;
	localizations: Localizations;
}

interface CantFind {
	id: number;
	Title: string;
	CTA: null;
}

interface Localizations {
	data: any[];
}

interface Meta {}