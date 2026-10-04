# Java + React Calculator

Full-stack calculator with calculation history.

## Tech Stack
- Backend: Java 17+, Spring Boot, Spring Data JPA, MySQL
- Frontend: React (Vite), Axios

## Features
- Add, subtract, multiply, divide via REST API
- Divide-by-zero validation
- Last 10 calculations saved in MySQL and shown as history

## API
- `POST /api/calculate` : `{ "num1": 10, "num2": 5, "operation": "add" }`
- `GET /api/history`

## Run
1. Create MySQL database `calculator_db`
2. Backend: `cd Backend` then `./mvnw spring-boot:run` (port 8080)
3. Frontend: `cd Frontend`, `npm install`, `npm run dev` (port 5173)