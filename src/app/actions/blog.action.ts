"use server";
import { APIService } from "@/services/api.service";
import { LeadModel } from "@/interfaces/lead-response.interface";
import { blogInquirySchema } from "@/lib/validations/lead.schema";
import { extractLeadFormData } from "@/lib/helpers";
import { cleanPhoneNumber } from "@/utils/phone-format";

export type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message?: string;
};

export async function submitBlogInquiry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = extractLeadFormData(formData);
  const validation = blogInquirySchema.safeParse(rawData);

  if (!validation.success) {
    const errors: Record<string, string[]> = {};
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() || "general";
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    });
    return { success: false, errors };
  }
  
  try {
    const { name, email, phone, countryCode, message } = validation.data;

    const payload: Partial<LeadModel> = {
      Name: name,
      Email: email,
      Phone_number: cleanPhoneNumber(phone),
      ...(countryCode && { Country_code: countryCode }),
      Message: message,
    };

    await APIService.createLead(payload);

    return {
      success: true,
      errors: {},
      message: "Thank you for contacting us! We will get back to you soon.",
    };
  } catch (error: unknown) {
    console.error("Error submitting blog inquiry:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error submitting the form";
    return {
      success: false,
      errors: { general: [errorMessage] },
    };
  }
}