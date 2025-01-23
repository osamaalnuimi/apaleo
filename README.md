# Apaleo User List Project

## Project Overview

This Angular application is developed using modern web development technologies, including:

- Nx Workspace
- Angular Material
- Tailwind CSS
- NgRx Store
- Jest for Unit Testing
- Playwright for E2E Testing
- Docker Support

## Prerequisites

- Node.js
- npm

## Installation

```sh
npm install
```

## Development Server

Run the development server:

```sh
npx nx serve apaleo
```

## Build

Create a production bundle:

```sh
npx nx build apaleo
```

## Project Insights

To view all available targets for the project:

```sh
npx nx show project apaleo
```

To explore the project dependency graph:

```sh
npx nx graph
```

## Testing

- Unit Tests: Implemented using Jest
- E2E Tests: Implemented using Playwright

Start the e2e tests:

```sh
npx nx run apaleo-e2e:e2e-ci--src/user-list.spec.ts
```

## Docker Support

### Build Docker Image

```sh
docker build -t apaleo-app -f apps/apaleo/Dockerfile .
```

Alternatively, you can pull the pre-built image from Docker Hub:

### Docker Hub Image

Pull the pre-built image:

```sh
docker pull osamaalnuimi/apaleo-app
```

### Run Docker Container

```sh
docker run -p 8080:80 apaleo-app
```

Access the application at `http://localhost:8080`

## Project Context

This project was developed as part of a larger application, utilizing the technology stack employed at Apaleo. While the current task focuses on creating a user list page, the project structure and tooling are designed with scalability and maintainability in mind.

## Technologies

- Nx: Monorepo and project management
- Angular: Frontend framework
- Angular Material: UI components
- Tailwind CSS: Utility-first CSS framework
- NgRx: State management
- Jest: Unit testing
- Playwright: End-to-end testing
- Docker: Containerization
