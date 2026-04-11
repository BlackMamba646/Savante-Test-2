import { BlocksContent } from '@strapi/blocks-react-renderer';

export interface DeveloperResponse {
	data: DeveloperModel[];
	meta: Meta;
}

export interface DeveloperModel {
	id: number;
	attributes: DatumAttributes;
}

interface DatumAttributes {
	Name: string;
	slug: string;
	Founded_in: string;
	Logo: Logo;
	Content: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

interface Logo {
	data: Data;
}

interface Data {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	name: string;
	alternativeText: null;
	caption: null;
	width: number;
	height: number;
	formats: null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
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

export interface DeveloperModelWithNumberOfProjects extends DeveloperModel {
	numberOfProjects: number;
}