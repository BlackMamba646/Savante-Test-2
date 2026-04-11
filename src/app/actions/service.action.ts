"use server";
import { APIService } from "@/services/api.service";
import { LeadModel } from "@/interfaces/lead-response.interface";
import { serviceInquirySchema } from "@/lib/validations/lead.schema";
import { extractLeadFormData } from "@/lib/helpers";
import { cleanPhoneNumber } from "@/utils/phone-format";

export type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message?: string;
};

export async function submitServiceInquiry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = extractLeadFormData(formData);
  const validation = serviceInquirySchema.safeParse(rawData);

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
    const { name, email, phone, countryCode, service } = validation.data;

    const payload: Partial<LeadModel> = {
      Name: name,
      Email: email,
      Phone_number: cleanPhoneNumber(phone),
      ...(countryCode && { Country_code: countryCode }),
      ...(service && { service: Number(service) }),
      Message: "Service consultation request",
    };

    await APIService.createLead(payload);

    return {
      success: true,
      errors: {},
      message:
        "Your request has been submitted successfully. We will get back to you soon.",
    };
  } catch (error: unknown) {
    console.error("Error submitting service inquiry:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error submitting the form";
    return {
      success: false,
      errors: { general: [errorMessage] },
    };
  }
}
