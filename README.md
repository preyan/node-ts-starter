# 🚀 AI Chatbot Customer Service Backend

[![Build](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/build.yml/badge.svg)](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/build.yml)
[![Test](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/test.yml/badge.svg)](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/test.yml)
[![Code Quality](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/code-quality.yml)
[![Docker Image CI](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend/actions/workflows/docker-image.yml)

## 🌟 Introduction

This project is a backend service for an AI chatbot customer service application. It is built with Express.js and TypeScript, providing a scalable and maintainable architecture for rapid development. 

## 💡 Code Structure

This project structure aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡ Facilitate rapid development
- 🛡️ Encourage best practices in security, testing, and performance

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
-  🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 📚 Directory Structure
```bash
.
├── .dockerignore
├── .env
├── .env.template
├── .github/
│   ├── renovate.json
│   └── workflows/
│       ├── build.yml
│       ├── code-quality.yml
│       ├── docker-image.yml
│       └── test.yml
├── .gitignore
├── .husky/
│   ├── _/
│   │   ├── .gitignore
│   │   ├── applypatch-msg
│   │   ├── commit-msg
│   │   ├── h
│   │   ├── husky.sh
│   │   ├── post-applypatch
│   │   ├── post-checkout
│   │   ├── post-commit
│   │   ├── post-merge
│   │   ├── post-rewrite
│   │   └── ...
│   ├── pre-commit
│   └── pre-push
├── .nvmrc
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── biome.json
├── Dockerfile
├── package.json
├── README.md
├── src/
│   ├── api/
│   │   └── ...
│   ├── api-docs/
│   │   ├── openAPIResponseBuilders.ts
│   │   ├── openAPIDocumentGenerator.ts
│   │   └── openAPIRouter.ts
│   ├── common/
│   │   ├── models/
│   │   │   └── serviceResponse.ts
│   │   └── utils/
│   │       ├── commonValidation.ts
│   │       └── httpHandlers.ts
│   ├── config/
│   │   ├── __tests__/
│   │   │   └── currentEnv.test.ts
│   │   └── currentEnv.ts
│   ├── index.ts
│   └── server.ts
├── tsconfig.json
└── vite.config.mts
```

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/Indian-Aspirant/ai-chatbot-customer-service-backend.git`
- Navigate: `cd ai-chatbot-customer-service-backend`
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`
