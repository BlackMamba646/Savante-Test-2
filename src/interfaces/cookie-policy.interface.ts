import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface CookiePolicyResponse {
	data: Data;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Title: string;
	Content: BlocksContent;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}