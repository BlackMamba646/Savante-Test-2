export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface IconsProps {
	className?: string;
	width?: number;
	height?: number;
}

export interface FormBasicPayload {
	first_name: string;
	last_name: string;
	phone: string;
	mobile: string;
	email: string;
}

export interface FormExtendedPayload {
	client_id: string | number;
	agent_id?: string | number;
	listing_id?: string | number;
	lead_source?: string;
	sub_status?: string;
	priority?: string;
	status?: string;
	note: string;
	type: string;
}

export interface AuthValues {
	username: string;
	password: string;
	client_id: number;
	client_secret: string;
	grant_type: string;
}