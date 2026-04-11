export interface ProjectPageResponse {
	data: ProjectPageResponseData;
	meta: Meta;
}

interface ProjectPageResponseData {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
	Floor_plans_title: string;
	Location_title: string;
	Payment_plans_title: string;
	Photo_gallery_title: string;
	Amenities_title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	Brochure_title: string;
	Why_us: WhyUs;
	Why_dubai: Why_dubai;
	Contact_off_plan: ContactOffPlan;
	Get_started: GetStarted & { Item_get_started: GetStarted[] };
}

interface ContactOffPlan {
	id: number;
	Title: string;
	Image: Image;
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

interface GetStarted {
	id: number;
	Title: string;
	Description: string;
}

interface WhyUs {
	id: number;
	Title: string;
	Paragraph: string;
	About_item?: WhyUs[];
}

interface Item_Why_Dubai {
	id: number;
	Title: string;
	Description: string;
	Image: Image;
}

interface Why_dubai {
	id: number;
	Title: string;
	Item_why_dubai: Item_Why_Dubai[];
}

interface Meta {}