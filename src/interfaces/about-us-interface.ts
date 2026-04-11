export interface AboutUsResponse {
	data: AboutUsModel;
	meta: Meta;
}

export interface AboutUsModel {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Hero_about: Hero;
	Section_1: Section1;
	Section_2: Section2;
	Why_us: WhyUs;
}

interface Hero {
	id: number;
	Kicker: string;
	Title: string;
	Description: string;
	Testimonial_name: string;
	Testimonial: string;
}

interface Section {
	id: number;
	Title: string;
	CTA: string;
}

interface Section1 {
	id: number;
	Title: string;
	Paragraph_1: string;
	Paragraph_2: string;
	Paragraph_3: string;
	Paragraph_4: string;
	Paragraph_5: string;
	Image: Image;
}

interface Section2 {
	id: number;
	Title: string;
	Paragraph_1: string;
	Paragraph_2: string;
	Paragraph_3: string;
	Image: Image;
	Our_mission: string;
	Our_vision: string;
}

interface Image {
	data: ImageData;
}

interface ImageData {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
	url: string;
}

interface Meta {}

export interface WhyUs {
	id: number;
	Title: string;
	Paragraph?: string;
	About_item?: WhyUsItem[];
}

interface WhyUsItem {
	id: number;
	Title: string;
	Paragraph: string;
}