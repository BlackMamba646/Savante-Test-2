import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface HomeResponse {
	data: HomeModel;
	meta: Meta;
}

export interface HomeModel {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Hero: Hero;
	Featured_properties_1: Areas;
	Featured_properties_2: Areas;
	Areas: Areas;
	Blog: Areas;
	Off_plan: Areas;
	Services: Areas;
	Featured_numbers: FeaturedNumbers;
	Why_us: WhyUsHome;
	About_us: AboutUs;
	Contact_us: { Section: { Title: string; CTA: string } };
	Instagram_section: InstagramSection;
	Podcast_section?: PodcastSection;
}

interface InstagramSection {
	id: number;
	Show: boolean;
}

interface PodcastSection {
	id: number;
	Title: string;
	Kicker: string;
	Show: boolean;
	Podcast: PodcastItem[];
}

interface PodcastItem {
	id: number;
	Title: string;
	Info: string;
	URL: string;
}

export interface AboutUs {
	id: number;
	Title: string;
	Phrase: string;
	Paragraph_1: string;
	Paragraph_2: BlocksContent;
	Paragraph_3: string;
	Paragraph_4: string;
	Image: Image;
	Team_title: string;
	Our_mission: string;
	Our_vision: string;
}

interface Image {
	data: ImageData;
}

interface ImageData {
	id: number;
	attributes: Meta;
}

interface Meta {
	url: string;
}

interface Paragraph2 {
	type: string;
	children: Child[];
}

interface Child {
	type: string;
	text: string;
}

interface Areas {
	id: number;
	Title: string;
	CTA?: string;
	Kicker?: string;
}

export interface FeaturedNumbers {
	id: number;
	Numeric_item_1: NumericItem;
	Numeric_item_2: NumericItem;
	Numeric_item_3: NumericItem;
}

interface NumericItem {
	id: number;
	Text: string;
	Number: number;
}

interface Hero {
	id: number;
	H1: string;
	Paragraph: string;
	Testimonial: string;
	Testimonial_name: string;
	Average_reviews: number;
	Number_reviews: number;
}

export interface WhyUsHome {
	id: number;
	Title: string;
	Paragraph: string;
	About_item?: WhyUsHome[];
}