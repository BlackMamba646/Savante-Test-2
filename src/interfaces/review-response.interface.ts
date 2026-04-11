export interface ReviewResponse {
	data: ReviewModel[];
	meta: Meta;
}

export interface ReviewModel {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Name: string;
	Rating: number;
	Role: number;
	URL: string;
	Testimony: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	localizations: Localizations;
}

interface Localizations {
	data: any[];
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