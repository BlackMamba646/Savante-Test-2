import { PropertyModel } from './property-response.interface';

export interface PropertyItemsResponse {
	status: string;
	message: null;
	record: Record;
	meta: null;
}

interface Record {
	data: Datum[];
	paginator: Paginator;
	query: Query[];
}

interface Datum {
	id: number;
	listing_status: ListingStatus;
	property_type: PropertyType;
	property_for: PropertyFor;
	category_id: number;
	unit_no: UnitNo;
	build_up_area: number;
	property_location: PropertyLocation;
	beds: number;
	baths: number;
	price: number;
	description: string;
	created_at: string;
	published_at: string;
	updated_at: string;
	assigned_to: any; // TODO: Replace 'any' with proper type if available
	created_by: any; // TODO: Replace 'any' with proper type if available
	location: { id: number; name: string; slug: string };
	sub_location: { id: number; name: string; slug: string };
	features: any; // TODO: Replace 'any' with proper type if available
	amenities: any; // TODO: Replace 'any' with proper type if available
	category: any; // TODO: Replace 'any' with proper type if available
	title: Title;
	slug: string;
	portal_status: PortalStatus;
	project_status: string;
	location_id: number;
	sub_location_id: number;
	submitted_by: SubmittedBy;
	video_url: string;
	brochure_url: string;
	images: Image[];
}

interface Image {
	id: number;
	path: string;
	plain_path: string;
	name: string;
	listing_id: number;
	type: Type;
	order: number;
	is_featured: number;
	created_at: Date;
	updated_at: Date;
	url: string;
	plain_url: string;
	listing: Listing;
}

interface Listing {
	id: number;
	created_by_id: number;
	assigned_to_id: number;
	owner_id: number;
	tenant_id: null;
	reference: Reference;
	category_id: number;
	beds: number;
	baths: number;
	country_id: number;
	city_id: number;
	location_id: number;
	sub_location_id: number;
	property_location: PropertyLocation;
	place_id: null;
	language_id: number;
	title: Title;
	description: string;
	community_description: null;
	bayut_description: string;
	slug: string;
	property_for: PropertyFor;
	property_type: PropertyType;
	permit_no: string;
	building_no: null;
	unit_no: UnitNo;
	type: string;
	street_no: string;
	floor: string;
	build_up_area: number;
	plot_area: null;
	view: View;
	furnished: Furnished;
	parking: string;
	price: number;
	price_per_sq_feet: number;
	frequency: Frequency;
	cheques: null;
	commission_percent: null;
	deposit_percent: null;
	commission: number;
	deposit: number;
	photo: null;
	video: string;
	floor_plan: null;
	youtube_link: string;
	virtual_toure_link: string;
	audio_link: string;
	video_toure_link: string;
	qrcode_link: string;
	brochure_link: string;
	notes: null;
	status_id: null;
	source_id: null;
	is_featured: number;
	dewa: string;
	str_no: string;
	next_available_date: null;
	remind: string;
	key_location: string;
	is_tenanted: number;
	rented_price: null;
	rented_until: null;
	maintenance_fee: null;
	rental_price_per_sq_feet: null;
	is_managed: number;
	is_exclusive: number;
	start_date: null;
	end_date: null;
	is_invite: number;
	is_poa: number;
	is_premium: number;
	listing_status: ListingStatus;
	close_status: null;
	completion_status: null;
	tenure: null;
	completion_date: null;
	construction_status: null;
	payment_plan: null;
	scheduled_date: null;
	expiry_date: Date;
	published_at: Date;
	property_developer: null;
	property_ownership: PropertyOwnership;
	occupancy: null;
	project_status: null;
	portal_status: PortalStatus;
	is_expiry_notified: number;
	submitted_by: SubmittedBy;
	documents_status: DocumentsStatus;
	is_watermark: number;
	arabic_title: null;
	arabic_description: null;
	transaction_no: null;
	price_on_request: number;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	closed_at: null;
	leads_count: number;
	video_url: string;
	brochure_url: string;
}

enum DocumentsStatus {
	Pending = 'Pending',
}

enum Frequency {
	Yearly = 'Yearly',
}

enum Furnished {
	FullyFurnished = 'Fully Furnished',
}

enum ListingStatus {
	Approved = 'Approved',
}

enum PortalStatus {
	Published = 'Published',
}

enum PropertyFor {
	Sale = 'Sale',
}

enum PropertyLocation {
	Jumeirah2JumeirahDubai = 'Jumeirah 2, Jumeirah, Dubai',
}

enum PropertyOwnership {
	Freehold = 'Freehold',
}

enum PropertyType {
	Residential = 'Residential',
}

enum Reference {
	RoS211074 = 'RO-S-21-1074',
	RoS211076 = 'RO-S-21-1076',
}

enum SubmittedBy {
	Agent = 'agent',
}

enum Title {
	ExquisiteDuplexAptInJumeirahBrandedResidence = 'Exquisite Duplex Apt In Jumeirah Branded Residence',
	LuxuryDuplexApartmentWithPrivatePool = 'Luxury Duplex Apartment With Private Pool',
}

enum UnitNo {
	Jum1 = 'Jum1',
	Jum2 = 'Jum2',
}

enum View {
	CanalAndBurjView = 'Canal and Burj View',
	WaterCanalAndBurjView = 'Water Canal and Burj View',
}

enum Type {
	Image = 'Image',
}

interface Paginator {
	current_page: number;
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string;
	path: string;
	per_page: string;
	prev_page_url: null;
	to: number;
	total: number;
}

interface Query {
	query: string;
	bindings: Array<number | string>;
	time: number;
}