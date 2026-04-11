export interface AgentResponse {
  data: AgentModel[];
  meta: Meta;
}

export interface AgentModel {
  id: number;
  attributes: DatumAttributes;
}

interface DatumAttributes {
  Name: string;
  Role: string;
  Broker_number: string;
  Experience: string;
  Short_biography: string;
  Language: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Contact: Contact;
  Image: Image;
}

interface Contact {
  id: number;
  WhatsApp: string;
  Email: string;
  Phone: string;
}

interface Image {
	data: Data;
}

interface Data {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	url: string;
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