import { describe, expect, it } from "vitest";
import {
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
} from "../utils/helpers"; // Adjust the import path

describe("Utility Functions Tests", () => {
  // Test isNumeric function
  describe("isNumeric", () => {
    it("should return true for numeric values", () => {
      expect(isNumeric("123")).toBe(true);
      expect(isNumeric("-123")).toBe(true);
    });

    it("should return false for non-numeric values", () => {
      expect(isNumeric("123abc")).toBe(false);
      expect(isNumeric("abc")).toBe(false);
      expect(isNumeric("")).toBe(false);
    });
  });

  // Test isJsonString function
  describe("isJsonString", () => {
    it("should return true for valid JSON strings", () => {
      expect(isJsonString("{}")).toBe(true);
      expect(isJsonString('{"key":"value"}')).toBe(true);
    });

    it("should return false for invalid JSON strings", () => {
      expect(isJsonString("{key:value}")).toBe(false);
      expect(isJsonString("not a json")).toBe(false);
    });
  });

  // Test formatSearchParams function
  describe("formatSearchParams", () => {
    it("should trim and decode URI components", () => {
      expect(formatSearchParams("  hello%20world  ")).toBe("hello world");
      expect(formatSearchParams("")).toBe("");
    });
  });

  // Test replaceEmptyStringsWithNull function
  describe("replaceEmptyStringsWithNull", () => {
    it("should replace empty strings with null", () => {
      const obj = { a: "", b: "value", c: { d: "" } };
      expect(replaceEmptyStringsWithNull(obj)).toEqual({
        a: null,
        b: "value",
        c: { d: null },
      });
    });
  });

  // Test trimObject function
  describe("trimObject", () => {
    it("should trim all string values in an object", () => {
      const obj = { a: "  test  ", b: { c: "  value  " } };
      expect(trimObject(obj)).toEqual({ a: "test", b: { c: "value" } });
    });

    it("should handle arrays and nested objects", () => {
      const obj = {
        a: ["  test  ", "  value  "],
        b: { c: "  trim  ", d: ["  example  "] },
      };
      expect(trimObject(obj)).toEqual({
        a: ["test", "value"],
        b: { c: "trim", d: ["example"] },
      });
    });
  });

  // Test getDayName function
  describe("getDayName", () => {
    it("should return the correct day name for a given day number", async () => {
      expect(await getDayName(0)).toBe("Sunday");
      expect(await getDayName(6)).toBe("Saturday");
    });

    it("should return the current day name when no day number is provided", async () => {
      const today = new Date().getDay();
      expect(await getDayName()).toBe(new Date().toLocaleString("en-US", { weekday: "long" }));
    });
  });

  // Test getCurrentDateTime function
  describe("getCurrentDateTime", () => {
    it("should return the current date and time in YYYY-MM-DDTHH:MM:SS format", () => {
      const now = new Date().toISOString().replace("Z", "").split(".")[0];
      expect(getCurrentDateTime()).toBe(now);
    });
  });

  // Test getCurrentDate function
  describe("getCurrentDate", () => {
    it("should return the current date in YYYY-MM-DD format", () => {
      expect(getCurrentDate()).toBe(new Date().toISOString().split("T")[0]);
    });
  });

  // Test addTimeToCurrentDate function
  describe("addTimeToCurrentDate", () => {
    it("should add time to the current date", () => {
      const result = addTimeToCurrentDate("12:00:00");
      const expected = new Date(`${getCurrentDate()}T12:00:00`).toISOString();
      expect(result.toISOString()).toBe(expected);
    });

    it("should throw an error for invalid date-time format", () => {
      expect(() => addTimeToCurrentDate("12:00:00", "invalid-date")).toThrow();
    });
  });

  // Test convertMongoDBDateToDateTime function
  describe("convertMongoDBDateToDateTime", () => {
    it("should convert MongoDB date string to YYYY-MM-DDTHH:MM:SS format", () => {
      const mongoDate = new Date().toISOString();
      expect(convertMongoDBDateToDateTime(mongoDate)).toBe(mongoDate.split(".")[0]);
    });
  });

  // Test addYearsToCurrentDate function
  describe("addYearsToCurrentDate", () => {
    it("should add years to the current date", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 10);
      const expected = `${futureDate.toISOString().split("T")[0]}T00:00:00`;
      expect(addYearsToCurrentDate()).toBe(expected);
    });
  });

  // Test getFinancialYearDates function
  describe("getFinancialYearDates", () => {
    it("should return the correct start and end dates of the financial year", async () => {
      const now = new Date();
      const startMonth = now.getMonth() >= 3 ? 4 : 4;
      const startYear = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
      const endYear = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();

      expect(await getFinancialYearDates()).toEqual({
        financialYearStart: `${startYear}-${String(startMonth).padStart(2, "0")}-01T00:00:00`,
        financialYearEnd: `${endYear}-03-31T23:59:59`,
      });
    });
  });

  // Test isStrongPassword function
  describe("isStrongPassword", () => {
    it("should return true for strong passwords", () => {
      expect(isStrongPassword("A1b!cdef")).toBe(true);
      expect(isStrongPassword("P@ssw0rd")).toBe(true);
    });

    it("should return false for weak passwords", () => {
      expect(isStrongPassword("password")).toBe(false);
      expect(isStrongPassword("12345678")).toBe(false);
      expect(isStrongPassword("!@#$%^&")).toBe(false);
      expect(isStrongPassword("A1b!")).toBe(false);
    });
  });
});
