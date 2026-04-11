import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface ServicesResponse {
	data: ServiceModel[];
	meta: Meta;
}

export interface ServiceModel {
	id: number;
	attributes: DatumAttributes;
}

interface DatumAttributes {
	createdAt: string;
	updatedAt: string;
	publishedAt: Date;
	locale: Locale;
	Title: string;
	Introduction: string;
	slug: string;
	Introductory_title: string;
	Introductory_description: string;
	Phrase: string;
	Service_content: ServiceContent[];
	Testimony: Testimony;
	Main_image: MainImage;
	localizations: Localizations;
}

interface MainImage {
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
	formats: Formats;
	hash: string;
	ext: EXT;
	mime: MIME;
	size: number;
	url: string;
	previewUrl: null;
	provider: Provider;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

enum EXT {
	Webp = '.webp',
}

interface Formats {
	thumbnail: Large;
	large: Large;
	medium: Large;
	small: Large;
}

interface Large {
	name: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	path: null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

enum MIME {
	ImageWebp = 'image/webp',
}

enum Provider {
	Local = 'local',
}

interface ServiceContent {
	id: number;
	Subtitle: string;
	Content: BlocksContent;
	Image: MainImage;
}

interface Content {
	type: ContentType;
	children: Child[];
}

interface Child {
	type: ChildType;
	text: string;
}

enum ChildType {
	Text = 'text',
}

enum ContentType {
	Paragraph = 'paragraph',
}

interface Testimony {
	id: number;
	Name: Name;
	Testimony: string;
}

enum Name {
	HardikGosai = 'Hardik Gosai',
}

enum Locale {
	En = 'en',
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