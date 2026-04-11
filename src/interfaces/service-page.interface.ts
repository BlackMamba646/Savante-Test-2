import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface ServicePageResponse {
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
	Other_services: OtherServices;
	Testimony: AttributesTestimony;
	localizations: Localizations;
}

interface OtherServices {
	id: number;
	Title: string;
	CTA: null;
}

interface AttributesTestimony {
	id: number;
	Name: string;
	Rating: number;
	Testimony: BlocksContent;
}

interface TestimonyElement {
	type: string;
	children: Child[];
}

interface Child {
	type: string;
	text: string;
}

interface Localizations {
	data: any[];
}

interface Meta {}