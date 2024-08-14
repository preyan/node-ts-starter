import { env } from "@/common/utils/envConfig";

interface EnvConfiguration {
  frontEndUrl: string;
  mainBackendApiUrl: string;
}

const getEnvConfiguration = (mode: string): EnvConfiguration => {
  switch (mode) {
    case "development":
      return {
        frontEndUrl: env.FRONTEND_DEVELOPMENT_URL,
        mainBackendApiUrl: env.BACKEND_DEVELOPMENT_URL,
      };
    case "staging":
      return {
        frontEndUrl: env.FRONTEND_STAGING_URL,
        mainBackendApiUrl: env.BACKEND_STAGING_URL,
      };
    case "production":
      return {
        frontEndUrl: env.FRONTEND_PRODUCTION_URL,
        mainBackendApiUrl: env.BACKEND_PRODUCTION_URL,
      };
    case "test": // Added this case for handling test mode
      return {
        frontEndUrl: env.FRONTEND_DEVELOPMENT_URL,
        mainBackendApiUrl: env.BACKEND_DEVELOPMENT_URL,
      };
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
};

const currentMode = env.NODE_ENV; // Use the validated NODE_ENV from envalid
if (!currentMode) {
  throw new Error("NODE_ENV environment variable is not defined");
}

const currentEnvConfiguration = getEnvConfiguration(currentMode);

export { currentEnvConfiguration };
