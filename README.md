# Hospital Management System (Feature-Grouped Layered Architecture)

## Project Goal

This project is designed to build a feature-grouped application with a layered architecture using modern Node.js tooling. The focus is on demonstrating strong software engineering skills in a public project without using AI-generated code.

The project is still in its early stages and will continue to grow over time with more features, better error handling, and richer documentation.

## What This Project Uses

- Node.js
- TypeScript
- pnpm
- Express
- MongoDB
- Docker
- Zod
- Vitest
- Mongoose
- bcryptjs
- cors
- dotenv
- tsx
- tsup

## Architecture Overview

The repository uses a feature-grouped structure with layered responsibilities:

- `src/features/` contains feature modules like `employee`
- Each feature follows a layered approach with controller, service, repository, routes, DTOs, and models
- `src/config/` contains configuration logic
- `src/errors/` contains custom error classes and database-related error handling
- `docker/` and `docker-compose.yml` support development with MongoDB

This structure encourages separation of concerns, easier maintenance, and better scalability as the project grows.

## Current Status

This project has just started. The foundation is in place, and the following tools and patterns are currently configured or in use:

- `pnpm` as package manager
- `TypeScript` for typed development
- `Express` for HTTP routing
- `MongoDB` via `mongoose` for persistence
- `Docker` and `docker-compose` for local environment setup
- `Zod` for schema validation and runtime validation
- `Vitest` configured for testing, but feature tests are not built yet
- `tsx` for fast TypeScript execution
- `bcryptjs` for password hashing
- `cors` and `dotenv` for middleware and environment config

## Run the Project

Install dependencies:

```bash
pnpm install
```

Start in development mode:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

Build for production:

```bash
pnpm build
pnpm start
```

## Known Limitations

- There is no auth middleware yet (see Roadmap). This means `POST /api/v1/employee` currently accepts any `role`, including `admin`, from an unauthenticated caller. This is expected at this stage of the project and will be closed once auth is implemented.

## Roadmap

### Already implemented

- [x] Node.js
- [x] TypeScript
- [x] pnpm
- [x] Express
- [x] MongoDB
- [x] Docker
- [x] Zod
- [x] Feature-grouped layered architecture
- [x] Mongoose
- [x] bcryptjs
- [x] cors
- [x] dotenv
- [x] tsx
- [x] tsup

### To Do

- [ ] Pagination
- [ ] Auth Middleware
- [ ] New features (login, patient, queue)
- [ ] File handling
- [ ] Tests (Vitest configured, test suites not built yet)
- [ ] Error handling in general
- [ ] API documentation (Swagger + Scalar not built yet)
- [ ] Biome for linting, formatting, or code quality checks

## Future Project Variants

When this project is complete, the plan is to start again with the same idea but a different stack, such as:

- Example 1: Fastify project with Drizzle ORM and PostgreSQL using hexagonal architecture
- Example 2: NestJS project with Prisma and PostgreSQL using microservices

## Notes

This repository is intentionally a starting point for demonstrating strong Node.js architecture and tooling expertise. It will continue to evolve and improve as features and infrastructure are added.
