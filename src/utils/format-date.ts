export function formatDate(dateString: string): string {
  try {
    // Parse ISO string to Date object
    const date = dateString ? new Date(dateString) : new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Format the date using Intl.DateTimeFormat for more consistent results
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatter.format(date);
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "Invalid date";
  }
}


export function formatDateWithMonth(dateString: string): string {
  try {
    const date = dateString ? new Date(dateString) : new Date();
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = date
      .toLocaleString("en-US", { month: "long" })
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "";
  }
}

export const formatDateWithMonthStatic = (dateString: string): string => {
  if (!dateString) return "";

  try {
    const [year, month, day] = dateString.split('T')[0].split('-');
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex] || "";

    // Remover ceros iniciales del día
    const dayNumber = parseInt(day, 10);

    return `${dayNumber} ${monthName} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
