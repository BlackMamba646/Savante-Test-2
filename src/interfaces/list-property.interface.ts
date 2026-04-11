export interface ListPropertyPage {
	data: Data;
	meta: Meta;
}

export interface Data {
	id: number;
	attributes: Attributes;
}

export interface Attributes {
	Title: string;
	Short_description: string;
	CTA: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	Why_us: WhyUs;
}

export interface WhyUs {
	id: number;
	Title: string;
	Paragraph: string;
	About_item?: WhyUs[];
}

export interface Meta {}