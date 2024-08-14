import dotenv from "dotenv";
import { bool, cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  // COMMON
  NODE_ENV: str({
    devDefault: testOnly("development"),
    choices: ["development", "production", "staging", "test"],
  }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),

  // CORS SETTINGS
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),

  // RATE LIMITING
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  // RDBMS DB CREDENTIALS
  DB_HOST: host({ default: "localhost" }),
  DB_USER: str({ default: "mock_user" }),
  DB_NAME: str({ default: "mock_db" }),
  DB_DRIVER: str({ default: "mock_driver" }),
  DB_PASSWORD: str({ default: "mock_password" }),
  DB_PORT: port({ default: 5432 }), // Default port for PostgreSQL
  DB_LOGGING: bool({ default: false }),

  // MONGODB CREDENTIALS
  MONGODB_CONNECTION_STRING: str({
    default: "mongodb://localhost:27017/mockdb",
  }),
  MONGODB_DATABASE_NAME: str({ default: "mock_mongo_db" }),

  // FRONTEND URL
  FRONTEND_DEVELOPMENT_URL: str({ default: "http://localhost:5173" }),
  FRONTEND_STAGING_URL: str({ default: "http://staging.example.com" }),
  FRONTEND_PRODUCTION_URL: str({ default: "http://example.com" }),

  // BACKEND URL
  BACKEND_DEVELOPMENT_URL: str({ default: "http://localhost:5173" }),
  BACKEND_STAGING_URL: str({ default: "http://staging.example.com" }),
  BACKEND_PRODUCTION_URL: str({ default: "http://example.com" }),

  // JWT
  JWT_SECRET_KEY: str({ default: "mock_jwt_secret_key" }),
  JWT_REFRESH_TOKEN_KEY: str({ default: "mock_jwt_refresh_token_key" }),
  JWT_SECRET_EXPIRE_TIME: num({ default: 10 }), // 10 seconds as mock
  JWT_REFRESH_SECRET_EXPIRE_TIME: num({ default: 3 }), // 3 seconds as mock

  // TIMEZONE
  TZ: str({ default: "Asia/Kolkata" }),
});
