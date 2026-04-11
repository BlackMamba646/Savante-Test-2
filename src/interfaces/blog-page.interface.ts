export interface BlogPageResponse {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Title: string;
	CTA: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

interface Meta {}