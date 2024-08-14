import { describe, expect, it } from "vitest";
import { commonValidations } from "./../utils/commonValidation";

describe("commonValidations", () => {
  describe("id validation", () => {
    it("should pass for a valid ID", () => {
      expect(commonValidations.id.parse("123")).toBe(123);
    });

    it("should fail for a non-numeric ID", () => {
      expect(() => commonValidations.id.parse("abc")).toThrowError("ID must be a numeric value");
    });

    it("should fail for a negative ID", () => {
      expect(() => commonValidations.id.parse("-123")).toThrowError("ID must be a positive number");
    });
  });

  describe("email validation", () => {
    it("should pass for a valid email", () => {
      expect(commonValidations.email.parse("test@example.com")).toBe("test@example.com");
    });

    it("should fail for an invalid email", () => {
      expect(() => commonValidations.email.parse("invalid-email")).toThrowError("Invalid email address");
    });

    it("should fail for a short email", () => {
      expect(() => commonValidations.email.parse("a@b.c")).toThrowError("Invalid email address");
    });

    it("should fail for a long email", () => {
      const longEmail = `${"a".repeat(101)}@example.com`;
      expect(() => commonValidations.email.parse(longEmail)).toThrowError("Email address is too long");
    });
  });

  describe("password validation", () => {
    it("should pass for a valid password", () => {
      expect(commonValidations.password.parse("Password1")).toBe("Password1");
    });

    it("should fail for a short password", () => {
      expect(() => commonValidations.password.parse("Pass1")).toThrowError("Password is too short");
    });

    it("should fail for a password without uppercase", () => {
      expect(() => commonValidations.password.parse("password1")).toThrowError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
    });

    it("should fail for a password without a number", () => {
      expect(() => commonValidations.password.parse("Password")).toThrowError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
    });
  });

  describe("name validation", () => {
    it("should pass for a valid name", () => {
      expect(commonValidations.name.parse("John")).toBe("John");
    });

    it("should fail for a short name", () => {
      expect(() => commonValidations.name.parse("J")).toThrowError("Name is too short");
    });

    it("should fail for a long name", () => {
      const longName = `${"J".repeat(101)}`;
      expect(() => commonValidations.name.parse(longName)).toThrowError("Name is too long");
    });
  });

  describe("username validation", () => {
    it("should pass for a valid username", () => {
      expect(commonValidations.username.parse("user_123")).toBe("user_123");
    });

    it("should fail for a short username", () => {
      expect(() => commonValidations.username.parse("usr")).toThrowError("Username is too short");
    });

    it("should fail for a username with invalid characters", () => {
      expect(() => commonValidations.username.parse("user@123")).toThrowError(
        "Username can only contain letters, numbers, and underscores",
      );
    });
  });

  describe("avatar URL validation", () => {
    it("should pass for a valid URL", () => {
      expect(commonValidations.avatar.parse("http://example.com/avatar.png")).toBe("http://example.com/avatar.png");
    });

    it("should fail for an invalid URL", () => {
      expect(() => commonValidations.avatar.parse("invalid-url")).toThrowError("Invalid URL");
    });

    it("should fail for a URL with spaces", () => {
      expect(() => commonValidations.avatar.parse("http://example .com/avatar.png")).toThrowError("Invalid URL");
    });
  });
});
