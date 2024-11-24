# Full TypeScript Stack with Vue and tRPC

This project sets up a full TypeScript stack using Vue.js for the frontend and tRPC for building typesafe APIs. It provides a modern approach for building scalable web applications with end-to-end type safety.

## Project Structure

- **Root**: The root directory contains the configuration files and setup to run both the client and server concurrently.
- **PROJ.CLIENT**: The frontend application folder built with Vue.js using TypeScript.
- **proj.server**: The backend API built with tRPC to handle data requests and responses.

## Getting Started

To get started, follow these steps:

1. **Install dependencies** in all three directories:
    ```
    npm i
    ```
    - Root
    - PROJ.CLIENT
    - proj.server

2. **Run the development server** from the root directory:
    ```bash
    npm run dev
    ```

    This will start both the client and server in development mode.


## Technologies Used

- **TypeScript**: Strongly typed JavaScript for better tooling and safer code.
- **Vue.js**: Progressive JavaScript framework for building user interfaces.
- **tRPC**: A framework for building end-to-end type-safe APIs.
