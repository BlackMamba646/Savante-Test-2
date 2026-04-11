export function extractLeadFormData(formData: FormData) {
  return {
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    countryCode: formData.get("countryCode")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    reason: formData.get("reason")?.toString() || "",
    operation: formData.get("operation")?.toString() || "",
    type: formData.get("type")?.toString() || "",
    property: formData.get("property")?.toString() || "",
    project: formData.get("project")?.toString() || "",
    service: formData.get("service")?.toString() || "",
    area: formData.get("area")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
  };
}

export function buildFullName(
  firstName?: string,
  lastName?: string,
  name?: string
): string {
  if (name && name.trim()) {
    return name.trim();
  }
  return `${firstName || ""} ${lastName || ""}`.trim();
}
