export interface TestimonyResponse {
	data: TestimonyModel[];
	meta: Meta;
}

export interface TestimonyModel {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Name: string;
	Rating: number;
	Role: number;
	URL: string;
	Testimony: string;
	Testimony_part1: string;
	Testimony_part2: string;
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