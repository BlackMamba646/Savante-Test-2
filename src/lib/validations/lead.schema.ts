import { z } from "zod";

// Base fields for all lead forms
const baseFields = {
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .trim(),
  phone: z
    .string()
    .min(1, "Phone is required")
    .min(6, "Phone must be at least 6 digits")
    .trim(),
  countryCode: z.string().optional(),
};

// Schema for contact form
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  message: z.string().min(1, "Message is required").trim(),
});

// Schema for hero lead form
export const heroLeadFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
});

// Schema for project inquiry
export const projectInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  project: z.union([z.coerce.number(), z.string()]).optional(),
  message: z.string().min(1, "Message is required").trim(),
});

// Schema for service inquiry
export const serviceInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  service: z.union([z.string(), z.number()]).optional(),
});

// Schema for blog inquiry
export const blogInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  message: z.string().optional(),
});

// Schema for brochure download (BrochureForm)
export const brochureFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  project: z.union([z.string(), z.number()]).optional(),
});

export const leadMagnetFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
});

// Schema for about property form
export const aboutPropertySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  message: z.string().min(1, "Message is required").trim(),
});

// Schema for contact modal
export const contactModalSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  message: z.string().optional(),
});

// Schema for area inquiry
export const areaInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  area: z.string(),
});

// Schema for list your property form
export const listPropertySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  operation: z.string().min(1, "Please select what you want to do").trim(),
});

// Schema for property mortgage form
export const mortgageFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  ...baseFields,
  budget: z.string().min(1, "Budget is required").trim(),
  message: z.string().optional(),
});


// Inferred types
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type HeroLeadFormInput = z.infer<typeof heroLeadFormSchema>;
export type ProjectInquiryInput = z.infer<typeof projectInquirySchema>;
export type ServiceInquiryInput = z.infer<typeof serviceInquirySchema>;
export type BlogInquiryInput = z.infer<typeof blogInquirySchema>;
export type BrochureFormInput = z.infer<typeof brochureFormSchema>;
export type AboutPropertyInput = z.infer<typeof aboutPropertySchema>;
export type ContactModalInput = z.infer<typeof contactModalSchema>;
export type ListPropertyInput = z.infer<typeof listPropertySchema>;
