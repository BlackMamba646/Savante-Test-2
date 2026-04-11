"use server";
import { APIService } from "@/services/api.service";
import { LeadModel } from "@/interfaces/lead-response.interface";
import { brochureFormSchema } from "@/lib/validations/lead.schema";
import { extractLeadFormData } from "@/lib/helpers";
import { cleanPhoneNumber } from "@/utils/phone-format";

export type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message?: string;
};

export async function submitBrochureDownload(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = extractLeadFormData(formData);
  const validation = brochureFormSchema.safeParse(rawData);

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
    const { firstName, email, phone, countryCode, project } = validation.data;

    const payload: Partial<LeadModel> = {
      Name: firstName,
      Email: email,
      Phone_number: cleanPhoneNumber(phone),
      ...(countryCode && { Country_code: countryCode }),
      ...(project && { Project: Number(project) }),
      Message: project
        ? `Brochure download request for project #${project}`
        : "Brochure download request",
    };

    await APIService.createLead(payload);

    return {
      success: true,
      errors: {},
      message: "Thank you! You are being redirected to the brochure.",
    };
  } catch (error: unknown) {
    console.error("Error submitting brochure download:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error downloading the brochure";
    return {
      success: false,
      errors: { general: [errorMessage] },
    };
  }
}