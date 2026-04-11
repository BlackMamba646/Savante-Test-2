"use server";
import { APIService } from "@/services/api.service";
import { LeadModel } from "@/interfaces/lead-response.interface";
import { z } from "zod";
import { cleanPhoneNumber } from "@/utils/phone-format";
import { mortgageFormSchema } from "@/lib/validations/lead.schema";
import { extractLeadFormData } from "@/lib/helpers";

export type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message?: string;
};

export async function submitPropertyMortgageForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = extractLeadFormData(formData);
  console.log(rawData);
  const validation = mortgageFormSchema.safeParse(rawData);

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
    const { name, email, phone, countryCode, budget, message } =
      validation.data;

    const payload: Partial<LeadModel> = {
      Name: name,
      Email: email,
      Phone_number: cleanPhoneNumber(phone),
      ...(countryCode && { Country_code: countryCode }),
      ...(budget && { Budget: budget }),
      Message: message,
    };

    await APIService.createLead(payload);

    return {
      success: true,
      errors: {},
      message: "Thank you for contacting us! We will get back to you soon.",
    };
  } catch (error: unknown) {
    console.error("Error submitting mortgage form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error submitting the form";
    return {
      success: false,
      errors: { general: [errorMessage] },
    };
  }
}
