import { env } from "@/common/utils/envConfig";
import { describe, expect, it, vi } from "vitest";
import { currentEnvConfiguration } from "../currentEnv";

describe("getEnvConfiguration", () => {
  it("should return development configuration", () => {
    vi.stubEnv("NODE_ENV", "development");
    const config = currentEnvConfiguration;
    expect(config).toEqual({
      frontEndUrl: env.FRONTEND_DEVELOPMENT_URL,
      mainBackendApiUrl: env.BACKEND_DEVELOPMENT_URL,
    });
  });

  it("should return staging configuration", () => {
    vi.stubEnv("NODE_ENV", "staging");
    const config = currentEnvConfiguration;
    expect(config).toEqual({
      frontEndUrl: env.FRONTEND_STAGING_URL,
      mainBackendApiUrl: env.BACKEND_STAGING_URL,
    });
  });

  it("should return production configuration", () => {
    vi.stubEnv("NODE_ENV", "production");
    const config = currentEnvConfiguration;
    expect(config).toEqual({
      frontEndUrl: env.FRONTEND_PRODUCTION_URL,
      mainBackendApiUrl: env.BACKEND_PRODUCTION_URL,
    });
  });
});
