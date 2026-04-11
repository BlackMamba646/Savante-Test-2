interface PhoneFormat {
  mask: string;
  placeholder: string;
  maxLength: number;
}

const phoneFormats: Record<string, PhoneFormat> = {
  "+971": {
    // UAE
    mask: "## ### ####",
    placeholder: "50 123 4567",
    maxLength: 9,
  },
  "+1": {
    // USA / Canada / Caribbean
    mask: "(###) ###-####",
    placeholder: "(555) 123-4567",
    maxLength: 10,
  },
  "+44": {
    // UK
    mask: "#### ### ####",
    placeholder: "7400 123 456",
    maxLength: 11,
  },
  "+33": {
    // France
    mask: "## ## ## ## ##",
    placeholder: "06 12 34 56 78",
    maxLength: 10,
  },
  "+39": {
    // Italy
    mask: "### ### ####",
    placeholder: "312 345 6789",
    maxLength: 10,
  },
  "+49": {
    // Germany
    mask: "#### ########",
    placeholder: "1512 34567890",
    maxLength: 13,
  },
  "+34": {
    // Spain
    mask: "### ## ## ##",
    placeholder: "612 34 56 78",
    maxLength: 9,
  },
  "+7": {
    // Russia / Kazakhstan
    mask: "(###) ###-##-##",
    placeholder: "(912) 345-67-89",
    maxLength: 10,
  },
  "+55": {
    // Brazil
    mask: "(##) #####-####",
    placeholder: "(11) 98765-4321",
    maxLength: 11,
  },
  "+91": {
    // India
    mask: "##### #####",
    placeholder: "98765 43210",
    maxLength: 10,
  },
  "+30": {
    // Greece
    mask: "### ### ####",
    placeholder: "691 234 5678",
    maxLength: 10,
  },
  "+965": {
    // Kuwait
    mask: "#### ####",
    placeholder: "9876 5432",
    maxLength: 8,
  },
  "+962": {
    // Jordan
    mask: "# #### ####",
    placeholder: "7 9123 4567",
    maxLength: 9,
  },
  "+972": {
    // Israel
    mask: "##-###-####",
    placeholder: "50-123-4567",
    maxLength: 9,
  },
  "+58": {
    // Venezuela
    mask: "(###) ###-####",
    placeholder: "(412) 123-4567",
    maxLength: 10,
  },
  "+51": {
    // Peru
    mask: "### ### ###",
    placeholder: "987 654 321",
    maxLength: 9,
  },
  "+45": {
    // Denmark
    mask: "## ## ## ##",
    placeholder: "12 34 56 78",
    maxLength: 8,
  },
  "+213": {
    // Algeria
    mask: "### ## ## ##",
    placeholder: "551 23 45 67",
    maxLength: 9,
  },
  "+355": {
    // Albania
    mask: "## ### ####",
    placeholder: "67 123 4567",
    maxLength: 9,
  },
  "+376": {
    // Andorra
    mask: "### ###",
    placeholder: "312 345",
    maxLength: 6,
  },
  "+93": {
    // Afghanistan
    mask: "## ### ####",
    placeholder: "70 123 4567",
    maxLength: 9,
  },
  "+1-684": {
    // American Samoa
    mask: "(###) ###-####",
    placeholder: "(684) 733-1234",
    maxLength: 10,
  },
  "+358": {
    // Finland / Åland Islands
    mask: "## ### ## ##",
    placeholder: "41 234 56 78",
    maxLength: 9,
  },
  "+54": {
    // Argentina
    mask: "## ####-####",
    placeholder: "11 1234-5678",
    maxLength: 10,
  },
  "+374": {
    // Armenia
    mask: "## ### ###",
    placeholder: "91 234 567",
    maxLength: 8,
  },
  "+61": {
    // Australia
    mask: "#### ### ###",
    placeholder: "4123 456 789",
    maxLength: 9,
  },
  "+43": {
    // Austria
    mask: "#### ########",
    placeholder: "664 12345678",
    maxLength: 10,
  },
  "+994": {
    // Azerbaijan
    mask: "## ### ## ##",
    placeholder: "12 345 67 89",
    maxLength: 9,
  },
  "+973": {
    // Bahrain
    mask: "#### ####",
    placeholder: "3612 3456",
    maxLength: 8,
  },
  "+1242": {
    // Bahamas
    mask: "###-####",
    placeholder: "242-1234",
    maxLength: 7,
  },
  "+880": {
    // Bangladesh
    mask: "####-######",
    placeholder: "1712-345678",
    maxLength: 10,
  },
  "+32": {
    // Belgium
    mask: "### ## ## ##",
    placeholder: "470 12 34 56",
    maxLength: 9,
  },
  "+229": {
    // Benin
    mask: "## ## ## ##",
    placeholder: "12 34 56 78",
    maxLength: 8,
  },
  "+501": {
    // Belize
    mask: "###-####",
    placeholder: "622-1234",
    maxLength: 7,
  },
  "+1441": {
    // Bermuda
    mask: "###-####",
    placeholder: "292-1234",
    maxLength: 7,
  },
  "+591": {
    // Bolivia
    mask: "# #### ####",
    placeholder: "7 1234 5678",
    maxLength: 9,
  },
  "+387": {
    // Bosnia and Herzegovina
    mask: "## ### ###",
    placeholder: "61 234 567",
    maxLength: 8,
  },
  "+267": {
    // Botswana
    mask: "## ### ###",
    placeholder: "71 234 567",
    maxLength: 8,
  },
  "+226": {
    // Burkina Faso
    mask: "## ## ## ##",
    placeholder: "25 49 63 78",
    maxLength: 8,
  },
  "+257": {
    // Burundi
    mask: "## ## ## ##",
    placeholder: "79 12 34 56",
    maxLength: 8,
  },
  "+236": {
    // Central African Republic
    mask: "## ## ## ##",
    placeholder: "70 12 34 56",
    maxLength: 8,
  },
  "+235": {
    // Chad
    mask: "## ## ## ##",
    placeholder: "66 12 34 56",
    maxLength: 8,
  },
  "+56": {
    // Chile
    mask: "# #### ####",
    placeholder: "9 1234 5678",
    maxLength: 9,
  },
  "+86": {
    // China
    mask: "### #### ####",
    placeholder: "138 1234 5678",
    maxLength: 11,
  },
  "+57": {
    // Colombia
    mask: "### ### ####",
    placeholder: "300 123 4567",
    maxLength: 10,
  },
  "+242": {
    // Republic of the Congo
    mask: "## ### ####",
    placeholder: "06 123 4567",
    maxLength: 9,
  },
  "+238": {
    // Cape Verde
    mask: "### ## ##",
    placeholder: "991 23 45",
    maxLength: 7,
  },
  "+506": {
    // Costa Rica
    mask: "#### ####",
    placeholder: "8312 3456",
    maxLength: 8,
  },
  "+53": {
    // Cuba
    mask: "# ### ####",
    placeholder: "5 234 5678",
    maxLength: 8,
  },
  "+599": {
    // Curaçao
    mask: "### ####",
    placeholder: "951 2345",
    maxLength: 7,
  },
  "+420": {
    // Czech Republic
    mask: "### ### ###",
    placeholder: "601 123 456",
    maxLength: 9,
  },
  "+253": {
    // Djibouti
    mask: "## ## ## ##",
    placeholder: "77 12 34 56",
    maxLength: 8,
  },
  "+1767": {
    // Dominica
    mask: "###-####",
    placeholder: "225-1234",
    maxLength: 7,
  },
  "+1-809": {
    // Dominican Republic
    mask: "(###) ###-####",
    placeholder: "(809) 123-4567",
    maxLength: 10,
  },
  "+593": {
    // Ecuador
    mask: "## ### ####",
    placeholder: "99 123 4567",
    maxLength: 9,
  },
  "+20": {
    // Egypt
    mask: "### ### ####",
    placeholder: "100 123 4567",
    maxLength: 10,
  },
  "+503": {
    // El Salvador
    mask: "#### ####",
    placeholder: "7123 4567",
    maxLength: 8,
  },
  "+240": {
    // Equatorial Guinea
    mask: "### ### ###",
    placeholder: "222 123 456",
    maxLength: 9,
  },
  "+291": {
    // Eritrea
    mask: "# ### ###",
    placeholder: "7 123 456",
    maxLength: 7,
  },
  "+372": {
    // Estonia
    mask: "#### ####",
    placeholder: "5123 4567",
    maxLength: 8,
  },
  "+251": {
    // Ethiopia
    mask: "### ### ####",
    placeholder: "911 234 5678",
    maxLength: 10,
  },
  "+679": {
    // Fiji
    mask: "### ####",
    placeholder: "701 2345",
    maxLength: 7,
  },
  "+298": {
    // Faroe Islands
    mask: "######",
    placeholder: "123456",
    maxLength: 6,
  },
  "+241": {
    // Gabon
    mask: "# ## ## ##",
    placeholder: "6 12 34 56",
    maxLength: 7,
  },
  "+220": {
    // Gambia
    mask: "### ####",
    placeholder: "700 1234",
    maxLength: 7,
  },
  "+995": {
    // Georgia
    mask: "### ### ###",
    placeholder: "555 123 456",
    maxLength: 9,
  },
  "+233": {
    // Ghana
    mask: "### ### ####",
    placeholder: "244 123 4567",
    maxLength: 10,
  },
  "+224": {
    // Guinea
    mask: "### ## ## ##",
    placeholder: "601 12 34 56",
    maxLength: 9,
  },
  "+245": {
    // Guinea-Bissau
    mask: "#### ###",
    placeholder: "9551 234",
    maxLength: 7,
  },
  "+592": {
    // Guyana
    mask: "### ####",
    placeholder: "612 3456",
    maxLength: 7,
  },
  "+502": {
    // Guatemala
    mask: "#### ####",
    placeholder: "5123 4567",
    maxLength: 8,
  },
  "+509": {
    // Haiti
    mask: "## ## ####",
    placeholder: "34 12 3456",
    maxLength: 8,
  },
  "+504": {
    // Honduras
    mask: "####-####",
    placeholder: "9123-4567",
    maxLength: 8,
  },
  "+852": {
    // Hong Kong
    mask: "#### ####",
    placeholder: "9123 4567",
    maxLength: 8,
  },
  "+36": {
    // Hungary
    mask: "## ### ####",
    placeholder: "20 123 4567",
    maxLength: 9,
  },
  "+354": {
    // Iceland
    mask: "### ####",
    placeholder: "661 2345",
    maxLength: 7,
  },
  "+62": {
    // Indonesia
    mask: "###-###-####",
    placeholder: "812-345-6789",
    maxLength: 10,
  },
  "+98": {
    // Iran
    mask: "### ### ####",
    placeholder: "912 345 6789",
    maxLength: 10,
  },
  "+353": {
    // Ireland
    mask: "## ### ####",
    placeholder: "85 123 4567",
    maxLength: 9,
  },
  "+1876": {
    // Jamaica
    mask: "###-####",
    placeholder: "876-1234",
    maxLength: 7,
  },
  "+81": {
    // Japan
    mask: "##-####-####",
    placeholder: "90-1234-5678",
    maxLength: 10,
  },
  "+254": {
    // Kenya
    mask: "### ### ###",
    placeholder: "712 123 456",
    maxLength: 9,
  },
  "+371": {
    // Latvia
    mask: "## ### ###",
    placeholder: "21 234 567",
    maxLength: 8,
  },
  "+961": {
    // Lebanon
    mask: "# #### ####",
    placeholder: "3 1234 5678",
    maxLength: 9,
  },
  "+231": {
    // Liberia
    mask: "## ### ####",
    placeholder: "77 123 4567",
    maxLength: 9,
  },
  "+218": {
    // Libya
    mask: "##-###-####",
    placeholder: "91-234-5678",
    maxLength: 9,
  },
  "+423": {
    // Liechtenstein
    mask: "### ## ##",
    placeholder: "791 23 45",
    maxLength: 7,
  },
  "+370": {
    // Lithuania
    mask: "### #####",
    placeholder: "612 34567",
    maxLength: 8,
  },
  "+352": {
    // Luxembourg
    mask: "### ### ###",
    placeholder: "621 123 456",
    maxLength: 9,
  },
  "+853": {
    // Macau
    mask: "#### ####",
    placeholder: "6612 3456",
    maxLength: 8,
  },
  "+389": {
    // North Macedonia
    mask: "## ### ###",
    placeholder: "70 123 456",
    maxLength: 8,
  },
  "+261": {
    // Madagascar
    mask: "## ## ### ##",
    placeholder: "32 12 345 67",
    maxLength: 9,
  },
  "+960": {
    // Maldives
    mask: "###-####",
    placeholder: "790-1234",
    maxLength: 7,
  },
  "+356": {
    // Malta
    mask: "#### ####",
    placeholder: "9912 3456",
    maxLength: 8,
  },
  "+596": {
    // Martinique
    mask: "### ## ## ##",
    placeholder: "696 12 34 56",
    maxLength: 9,
  },
  "+230": {
    // Mauritius
    mask: "#### ####",
    placeholder: "5123 4567",
    maxLength: 8,
  },
  "+52": {
    // Mexico
    mask: "## #### ####",
    placeholder: "55 1234 5678",
    maxLength: 10,
  },
  "+373": {
    // Moldova
    mask: "#### ####",
    placeholder: "6912 3456",
    maxLength: 8,
  },
  "+377": {
    // Monaco
    mask: "## ## ## ##",
    placeholder: "12 34 56 78",
    maxLength: 8,
  },
  "+976": {
    // Mongolia
    mask: "#### ####",
    placeholder: "9912 3456",
    maxLength: 8,
  },
  "+382": {
    // Montenegro
    mask: "## ### ###",
    placeholder: "67 123 456",
    maxLength: 8,
  },
  "+212": {
    // Morocco
    mask: "####-######",
    placeholder: "6123-456789",
    maxLength: 10,
  },
  "+258": {
    // Mozambique
    mask: "## ### ####",
    placeholder: "82 123 4567",
    maxLength: 9,
  },
  "+264": {
    // Namibia
    mask: "## ### ####",
    placeholder: "81 123 4567",
    maxLength: 9,
  },
  "+227": {
    // Niger
    mask: "## ## ## ##",
    placeholder: "96 12 34 56",
    maxLength: 8,
  },
  "+234": {
    // Nigeria
    mask: "### ### ####",
    placeholder: "802 123 4567",
    maxLength: 10,
  },
  "+683": {
    // Niue
    mask: "####",
    placeholder: "1234",
    maxLength: 4,
  },
  "+47": {
    // Norway
    mask: "### ## ###",
    placeholder: "412 34 567",
    maxLength: 8,
  },
  "+968": {
    // Oman
    mask: "#### ####",
    placeholder: "9212 3456",
    maxLength: 8,
  },
  "+92": {
    // Pakistan
    mask: "###-#######",
    placeholder: "300-1234567",
    maxLength: 10,
  },
  "+507": {
    // Panama
    mask: "####-####",
    placeholder: "6123-4567",
    maxLength: 8,
  },
  "+595": {
    // Paraguay
    mask: "### ### ###",
    placeholder: "981 123 456",
    maxLength: 9,
  },
  "+63": {
    // Philippines
    mask: "### ### ####",
    placeholder: "917 123 4567",
    maxLength: 10,
  },
  "+48": {
    // Poland
    mask: "### ### ###",
    placeholder: "512 345 678",
    maxLength: 9,
  },
  "+351": {
    // Portugal
    mask: "### ### ###",
    placeholder: "912 345 678",
    maxLength: 9,
  },
  "+1-787": {
    // Puerto Rico
    mask: "(###) ###-####",
    placeholder: "(787) 123-4567",
    maxLength: 10,
  },
  "+974": {
    // Qatar
    mask: "#### ####",
    placeholder: "3312 3456",
    maxLength: 8,
  },
  "+40": {
    // Romania
    mask: "### ### ###",
    placeholder: "712 345 678",
    maxLength: 9,
  },
  "+250": {
    // Rwanda
    mask: "### ### ###",
    placeholder: "788 123 456",
    maxLength: 9,
  },
  "+966": {
    // Saudi Arabia
    mask: "## ### ####",
    placeholder: "50 123 4567",
    maxLength: 9,
  },
  "+221": {
    // Senegal
    mask: "## ### ## ##",
    placeholder: "77 123 45 67",
    maxLength: 9,
  },
  "+65": {
    // Singapore
    mask: "#### ####",
    placeholder: "9123 4567",
    maxLength: 8,
  },
  "+421": {
    // Slovakia
    mask: "### ### ###",
    placeholder: "912 123 456",
    maxLength: 9,
  },
  "+386": {
    // Slovenia
    mask: "## ### ###",
    placeholder: "40 123 456",
    maxLength: 8,
  },
  "+252": {
    // Somalia
    mask: "# #### ###",
    placeholder: "7 1234 567",
    maxLength: 8,
  },
  "+27": {
    // South Africa
    mask: "## ### ####",
    placeholder: "82 123 4567",
    maxLength: 9,
  },
  "+82": {
    // South Korea
    mask: "##-####-####",
    placeholder: "10-1234-5678",
    maxLength: 10,
  },
  "+211": {
    // South Sudan
    mask: "#### ######",
    placeholder: "9123 456789",
    maxLength: 10,
  },
  "+46": {
    // Sweden
    mask: "##-### ## ##",
    placeholder: "70-123 45 67",
    maxLength: 9,
  },
  "+41": {
    // Switzerland
    mask: "## ### ## ##",
    placeholder: "79 123 45 67",
    maxLength: 9,
  },
  "+963": {
    // Syria
    mask: "### ### ###",
    placeholder: "933 123 456",
    maxLength: 9,
  },
  "+886": {
    // Taiwan
    mask: "#### ### ###",
    placeholder: "9123 456 789",
    maxLength: 10,
  },
  "+255": {
    // Tanzania
    mask: "### ### ###",
    placeholder: "712 123 456",
    maxLength: 9,
  },
  "+66": {
    // Thailand
    mask: "## ### ####",
    placeholder: "81 234 5678",
    maxLength: 9,
  },
  "+228": {
    // Togo
    mask: "## ## ## ##",
    placeholder: "90 12 34 56",
    maxLength: 8,
  },
  "+1868": {
    // Trinidad and Tobago
    mask: "###-####",
    placeholder: "712-1234",
    maxLength: 7,
  },
  "+216": {
    // Tunisia
    mask: "## ### ###",
    placeholder: "98 123 456",
    maxLength: 8,
  },
  "+90": {
    // Turkey
    mask: "### ### ## ##",
    placeholder: "532 123 45 67",
    maxLength: 10,
  },
  "+256": {
    // Uganda
    mask: "### ### ###",
    placeholder: "712 345 678",
    maxLength: 9,
  },
  "+380": {
    // Ukraine
    mask: "## ### ## ##",
    placeholder: "50 123 45 67",
    maxLength: 9,
  },
  "+598": {
    // Uruguay
    mask: "#### ####",
    placeholder: "9912 3456",
    maxLength: 8,
  },
  "+84": {
    // Vietnam
    mask: "### ### ####",
    placeholder: "912 345 6789",
    maxLength: 10,
  },
  "+967": {
    // Yemen
    mask: "### ### ###",
    placeholder: "712 345 678",
    maxLength: 9,
  },
  "+260": {
    // Zambia
    mask: "### ### ###",
    placeholder: "955 123 456",
    maxLength: 9,
  },
  "+263": {
    // Zimbabwe
    mask: "## ### ####",
    placeholder: "77 123 4567",
    maxLength: 9,
  },
};

export function formatNumbersOnly(value: number): string {
  return value.toLocaleString("en-US");
}

/**
 * Formatea el número de teléfono según el código de país
 */
export function formatPhoneNumber(value: string, countryCode: string): string {
  const format = phoneFormats[countryCode];
  if (!format) return value;

  // Remover todo excepto números
  const numbers = value.replace(/\D/g, "");

  // Limitar al máximo de dígitos
  const limitedNumbers = numbers.slice(0, format.maxLength);

  // Aplicar la máscara
  let formatted = "";
  let numberIndex = 0;

  for (let i = 0; i < format.mask.length && numberIndex < limitedNumbers.length; i++) {
    if (format.mask[i] === "#") {
      formatted += limitedNumbers[numberIndex];
      numberIndex++;
    } else {
      formatted += format.mask[i];
    }
  }

  return formatted;
}

/**
 * Obtiene el placeholder según el código de país
 */
export function getPhonePlaceholder(countryCode: string): string {
  return phoneFormats[countryCode]?.placeholder || "000 000 0000";
}

/**
 * Valida si el número de teléfono es válido para el código de país
 */
export function validatePhoneNumber(value: string, countryCode: string): boolean {
  const format = phoneFormats[countryCode];
  if (!format) return false;

  const numbers = value.replace(/\D/g, "");
  return numbers.length === format.maxLength;
}

/**
 * Limpia el número de teléfono (solo dígitos)
 */
export function cleanPhoneNumber(value: string): string {
  return value.replace(/\D/g, "");
}
