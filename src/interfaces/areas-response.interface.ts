export interface AreasResponse {
	data: AreaModel[];
	meta: Meta;
}

export interface AreaModel {
	id: number;
	attributes: DatumAttributes;
}

export interface AreaLink {
	slug: string;
	name: string;
}

interface DatumAttributes {
	slug: string;
	Description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: Date;
	locale: Locale;
	Meta_title: string;
	Area_name: string;
	H1: string;
	Content: string;
	Featured: boolean | null;
	Image: Image;
}

export interface AreaProperty extends AreaModel {
	property: {
		title: string;
		count: number;
		price?: number | string;
	};
}

interface Image {
	data: Data;
}

interface Data {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	url: string;
}

enum Locale {
	En = 'en',
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