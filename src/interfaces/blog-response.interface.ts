export interface BlogResponse {
	data: BlogModel[];
	meta: Meta;
}

export interface BlogModel {
	id: number;
	attributes: DatumAttributes;
}

interface DatumAttributes {
	Title: string;
	Blog_brief: string;
	Date_published: Date;
	Content: string;
	slug: string;
	Meta_title: string;
	Meta_description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: Date;
	locale: string;
	Main_image: MainImage;
}

interface MainImage {
	data: Data;
}

interface Data {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	url: string;
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