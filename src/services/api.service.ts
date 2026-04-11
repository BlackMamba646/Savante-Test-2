import { CMSRequestService } from "./cms-http.service";
import { ENDPOINT_SERVER } from "@/config/constant.config";
import {
  AboutUsResponse,
  AgentResponse,
  AreasResponse,
  BlogPageResponse,
  BlogResponse,
  ContactInfoResponse,
  CookiePolicyResponse,
  DeveloperResponse,
  HomeResponse,
  LeadData,
  LeadModel,
  ProjectPageResponse,
  ProjectResponse,
  PropertyListingResponse,
  PropertyPageResponse,
  PropertyResponse,
  PropertySEOResponse,
  ServicePageResponse,
  ServicesResponse,
  TestimonyResponse,
} from "@/interfaces";
import { ListPropertyPage } from "@/interfaces/list-property.interface";

export const APIService = {
  init: function () {
    return new CMSRequestService();
  },
  findCookiePolicy: async function () {
    const { response } = await this.init().find<CookiePolicyResponse>(
      ENDPOINT_SERVER.CP
    );
    return response.data.attributes;
  },
  findPrivacyPolicy: async function () {
    const { response } = await this.init().find<CookiePolicyResponse>(
      ENDPOINT_SERVER.PP
    );
    return response.data.attributes;
  },
  findTermsAndConditions: async function () {
    const { response } = await this.init().find<CookiePolicyResponse>(
      ENDPOINT_SERVER.TC
    );
    return response.data.attributes;
  },
  findAgents: async function (query: object = {}) {
    const { response } = await this.init().find<AgentResponse>(
      ENDPOINT_SERVER.AGENTS,
      query
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findProperties: async function (query: object = {}) {
    const { response } = await this.init().find<PropertyResponse>(
      ENDPOINT_SERVER.PROPERTIES,
      query
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findProjects: async function (query: object = {}) {
    const { response } = await this.init().find<ProjectResponse>(
      ENDPOINT_SERVER.PROJECTS,
      query
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findAreas: async function (query: object = {}, options?: RequestInit) {
    const { response } = await this.init().find<AreasResponse>(
      ENDPOINT_SERVER.AREAS,
      query,
      options
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findClusters: async function (query: object = {}, options?: RequestInit) {
    const { response } = await this.init().find<{ data: Array<{ id: number; attributes: any }> }>(
      ENDPOINT_SERVER.CLUSTER,
      query,
      options
    );
    return response.data;
  },
  findDevelopers: async function (query: object = {}) {
    const { response } = await this.init().find<DeveloperResponse>(
      ENDPOINT_SERVER.DEVELOPERS,
      query
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findServices: async function (query: object = {}) {
    const { response } = await this.init().find<ServicesResponse>(
      ENDPOINT_SERVER.SERVICES,
      query
    );
    return response.data;
  },
  findBlogs: async function (query: object = {}) {
    const { response } = await this.init().find<BlogResponse>(
      ENDPOINT_SERVER.BLOGS,
      query
    );
    return { data: response.data, pagination: response.meta.pagination };
  },
  findTestimonies: async function (query: object = {}) {
    const { response } = await this.init().find<TestimonyResponse>(
      ENDPOINT_SERVER.TESTIMONIES,
      query
    );
    return response.data;
  },
  findHomePage: async function (query: object = {}) {
    const { response } = await this.init().find<HomeResponse>(
      ENDPOINT_SERVER.HOME_CONTENT,
      query
    );
    return response.data.attributes;
  },
  findPropertyPage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<PropertyPageResponse>(
      ENDPOINT_SERVER.PROPERTY_PAGE_CONTENT,
      query,
      options
    );
    return response.data.attributes;
  },
  findProjectPage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<ProjectPageResponse>(
      ENDPOINT_SERVER.OFF_PLAN_PAGE_CONTENT,
      query,
      options
    );
    return response.data.attributes;
  },
  findListPropertyPage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<ListPropertyPage>(
      ENDPOINT_SERVER.LIST_PROPERTY,
      query,
      options
    );
    return response.data.attributes;
  },
  findPropertyListingPage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<PropertyListingResponse>(
      ENDPOINT_SERVER.PROPERTY_LISTING,
      query,
      options
    );
    return response.data.attributes;
  },
  findProjectListingPage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<PropertyListingResponse>(
      ENDPOINT_SERVER.OFF_PLAN_LISTING,
      query,
      options
    );
    return response.data.attributes;
  },
  findServicePage: async function (query: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().find<ServicePageResponse>(
      ENDPOINT_SERVER.SERVICE_PAGE_CONTENT,
      query,
      options
    );
    return response.data.attributes;
  },
  findListYourPropertyPage: async function (query: object = {}) {
    const { response } = await this.init().find<ListPropertyPage>(
      ENDPOINT_SERVER.LIST_PROPERTY,
      query
    );
    return response.data.attributes;
  },
  findContactInfo: async function (query: object = {}) {
    const { response } = await this.init().find<ContactInfoResponse>(
      ENDPOINT_SERVER.CONTACT_INFO,
      query
    );
    return response.data.attributes;
  },
  findAboutUs: async function (query: object = {}) {
    const { response } = await this.init().find<AboutUsResponse>(
      ENDPOINT_SERVER.ABOUT_US_CONTENT,
      query
    );
    return response.data.attributes;
  },
  findPropertySEO: async function (query: object = {}) {
    const { response } = await this.init().find<PropertySEOResponse>(
      ENDPOINT_SERVER.PROPERTY_SEO,
      query
    );
    return response.data;
  },
  findBlogPage: async function (query: object = {}) {
    const { response } = await this.init().find<BlogPageResponse>(
      ENDPOINT_SERVER.BLOG_PAGE,
      query
    );
    return response.data.attributes;
  },
  createNewsletter: async function (payload: object = {}, options: RequestInit = {}) {
    const { response } = await this.init().create(
      ENDPOINT_SERVER.NEWSLETTER,
      { data: payload },
      options
    );
    return response;
  },
  createLead: async function (
    payload: Partial<LeadModel>,
    options: RequestInit = {}
  ) {
    const { response } = await this.init().create<{data: LeadData}>(
      ENDPOINT_SERVER.LEADS,
      { data: payload },
      options
    );
    return response;
  },
};