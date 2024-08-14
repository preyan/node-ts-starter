/**
 * Checks if a given value is numeric.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is numeric, false otherwise.
 */
const isNumeric = (value: string): boolean => /^-?\d+$/.test(value);

/**
 * Formats search parameters by trimming extra spaces and decoding URI components.
 * @param {string} value - The value to format.
 * @returns {string} - The formatted value.
 */
const formatSearchParams = (value: string): string => {
  if (!value) return "";
  return decodeURIComponent(value).trim();
};

/**
 * Gets the name of a day from its number or the current day's name.
 * @param {number} [dayNumber] - The day number (0 for Sunday, 1 for Monday, etc.).
 * @returns {Promise<string>} - The name of the day.
 */
const getDayName = async (dayNumber?: number): Promise<string> => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNumber !== undefined ? weekday[dayNumber] : weekday[new Date().getDay()];
};

/**
 * Gets the current date and time in YYYY-MM-DDTHH:MM:SS format.
 * @returns {string} - The current date and time.
 */
const getCurrentDateTime = (): string => {
  const now = new Date();
  return now.toISOString().replace("Z", "").split(".")[0];
};

/**
 * Gets the current date in YYYY-MM-DD format.
 * @returns {string} - The current date.
 */
const getCurrentDate = (): string => getCurrentDateTime().split("T")[0];

/**
 * Adds time to the current date or a provided date.
 * @param {string} timeString - The time to add in HH:MM:SS format.
 * @param {string} [dateString] - The date to combine with the time.
 * @returns {Date} - The resulting Date object.
 */
const addTimeToCurrentDate = (timeString: string, dateString = ""): Date => {
  const dateTimeString = dateString ? `${dateString}T${timeString}` : `${getCurrentDate()}T${timeString}`;

  const dateTime = new Date(dateTimeString);
  if (Number.isNaN(dateTime.getTime())) {
    throw new Error("Invalid date-time format. Please use 'YYYY-MM-DDTHH:MM:SS'.");
  }

  return dateTime;
};

/**
 * Converts a MongoDB date string to a standard DateTime format without milliseconds.
 * @param {string} dateString - The MongoDB date string.
 * @returns {string} - The formatted date-time string in YYYY-MM-DDTHH:MM:SS format.
 */
const convertMongoDBDateToDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toISOString()
    .replace(/\.\d{3}Z$/, "")
    .split("T")
    .join("T");
};

/**
 * Gets the start and end dates of the current financial year.
 * @returns {Promise<{financialYearStart: string; financialYearEnd: string}>} - The start and end dates of the financial year.
 */
const getFinancialYearDates = async (): Promise<{
  financialYearStart: string;
  financialYearEnd: string;
}> => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startMonth = month >= 3 ? 4 : 4; // Financial year starts in April
  const startYear = month >= 3 ? year : year - 1;
  const endYear = month >= 3 ? year + 1 : year;

  return {
    financialYearStart: `${startYear}-${String(startMonth).padStart(2, "0")}-01T00:00:00`,
    financialYearEnd: `${endYear}-03-31T23:59:59`,
  };
};

/**
 * Checks if a password is strong enough.
 * @param {string} password - The password to check.
 * @returns {boolean} - True if the password is strong, false otherwise.
 */
const isStrongPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLongEnough;
};

/**
 * Checks if a string is a valid JSON string.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a valid JSON, false otherwise.
 */
const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Replaces empty strings in an object with null values.
 * @param {Record<string, any>} obj - The object to process.
 * @returns {Record<string, any>} - The modified object.
 */
const replaceEmptyStringsWithNull = (obj: Record<string, any>): Record<string, any> => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      obj[key] = null;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      replaceEmptyStringsWithNull(obj[key]);
    }
  });
  return obj;
};

/**
 * Trims whitespace from all string values in an object, including nested objects and arrays.
 * @param {Record<string, any>} obj - The object to process.
 * @returns {Record<string, any>} - The modified object with trimmed strings.
 */
const trimObject = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = Array.isArray(obj)
    ? obj.map((item) => (typeof item === "object" ? trimObject(item) : item))
    : { ...obj };

  for (const key in result) {
    if (typeof result[key] === "string") {
      result[key] = result[key].trim();
    } else if (typeof result[key] === "object" && result[key] !== null) {
      result[key] = trimObject(result[key]);
    }
  }

  return result;
};

/**
 * Adds a specified number of years to the current date.
 * @param {number} [validUptoYear=10] - The number of years to add.
 * @returns {string} - The future date in YYYY-MM-DDTHH:MM:SS format.
 */
const addYearsToCurrentDate = (validUptoYear = 10): string => {
  const now = new Date();
  now.setFullYear(now.getFullYear() + validUptoYear);
  // Set time to 00:00:00 in local time
  now.setHours(0, 0, 0, 0);

  // Format date as YYYY-MM-DDTHH:MM:SS
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export {
  addTimeToCurrentDate,
  addYearsToCurrentDate,
  convertMongoDBDateToDateTime,
  formatSearchParams,
  getCurrentDate,
  getCurrentDateTime,
  getDayName,
  getFinancialYearDates,
  isJsonString,
  isNumeric,
  isStrongPassword,
  replaceEmptyStringsWithNull,
  trimObject,
};
