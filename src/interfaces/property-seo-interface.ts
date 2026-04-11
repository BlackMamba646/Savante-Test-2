import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface PropertySEOResponse {
	data: PropertySEOModel[];
	meta: Meta;
}

export interface PropertySEOModel {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Meta_title: string;
	Meta_description: string;
	H1: string;
	slug: string;
	Visible: boolean;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Filters: Filters;
	Content: AttributesContent[];
}

interface AttributesContent {
	id: number;
	H2: string;
	Content: BlocksContent;
	Image?: {
		data?: {
			attributes: {
				url: string;
			};
		};
	};
}

interface ContentContent {
	type: string;
	children: Child[];
}

interface Child {
	type: string;
	text: string;
}

export interface Filters {
	id: number;
	Operation: string;
	Location: string;
	Property_type: string;
	Bedrooms: string;
	Bathrooms: string;
	Min_price: number;
	Max_price: number;
	Min_sqft: number;
	Max_sqft: number;
	Off_plan?: boolean;
	area?: {
		data?: {
			id: number;
			attributes: {
				Area_name?: string;
				slug: string;
			};
		};
	};
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