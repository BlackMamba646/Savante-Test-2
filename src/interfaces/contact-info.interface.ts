export interface ContactInfoResponse {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

export interface ContactModel {
	Email: string;
	Phone: string;
	Address: string;
	WhatsApp: string;
	Facebook: string;
	Instagram: string;
	TikTok: string;
	Twitter: string;
	Linkedin: string;
	YouTube: string;
	updatedAt: Date;
	publishedAt: Date;
}

interface Attributes {
	Email: string;
	Phone: string;
	Address: string;
	WhatsApp: string;
	Facebook: string;
	Instagram: string;
	TikTok: string;
	Twitter: string;
	Linkedin: string;
	YouTube: string;
	updatedAt: Date;
	publishedAt: Date;
}

interface Meta {}