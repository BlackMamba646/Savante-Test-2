export interface LeadResponse {
	data: LeadData[];
	meta: Meta;
}

export interface LeadData {
	id: number;
	attributes: LeadModel;
}

export interface LeadModel {
	Name: string;
	Email: string;
	Country_code: string | null;
	Phone_number: string;
	Message: string;
	Reason: string;
	Operation: string;
	Type: string;
	Status: string;
	Budget: string | null;
	Category: string;
	Area: string;
	Bedrooms: number;
	property?: number | string;
	project?: number | string;
	service?: number | string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
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