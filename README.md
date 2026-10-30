
# 🚀 ShivaMai Systems — Developer Portfolio

A full-stack, cloud-deployed developer portfolio built to showcase software engineering skills, technical projects, professional experience, and continuous learning.

---

# 🌌 Overview

ShivaMai Systems Portfolio is a full-stack web application developed using React, Vite, Java 21, and Spring Boot.

The portfolio provides a centralized platform to explore my software development journey, technical capabilities, projects, professional experience, and coding activity.

It integrates a Spring Boot REST API with a React frontend, PostgreSQL database, and external LeetCode GraphQL API.

---

# 🌐 Live Portfolio

## Frontend
https://shivamai-portfolio.pages.dev

## Backend Health Endpoint
https://shivamai-portfolio.onrender.com/

---

# 🔥 Features

- 💻 Responsive developer portfolio
- 👨‍💻 Professional profile and About section
- 🛠 Technical skills and technology showcase
- 🚀 Software development project showcase
- 💼 Professional experience section
- 📄 Resume viewing and access
- 📬 Functional contact form
- 📧 Contact form email notifications using Brevo
- 🗄 Contact message persistence using PostgreSQL
- 📊 Dynamic LeetCode statistics integration
- 🧩 Solved problems breakdown by difficulty
- 🏆 LeetCode badges and upcoming challenges
- 📅 LeetCode submission activity heatmap
- 🔗 GitHub, LinkedIn, and professional profile links
- ☁️ Cloud deployment using Cloudflare Pages and Render
- 🐳 Docker-supported Spring Boot backend
- 🔐 Environment-based application configuration

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot 4.1.2
- Spring WebMVC
- Spring Data JPA
- Hibernate
- Spring Boot Validation
- Spring Boot Mail
- REST API Development
- Maven
- Docker

## Frontend

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Router DOM

## Database

- MySQL (Local Development)
- Neon PostgreSQL (Production)

## External Integrations

- LeetCode GraphQL API
- Brevo Email Service

## Deployment

- Cloudflare Pages (Frontend Hosting)
- Render (Backend Hosting)
- Neon PostgreSQL (Database Hosting)
- Docker (Containerization)
- Git & GitHub (Version Control)

---

# 🏗 System Architecture

```text
                    ┌─────────────────────┐
                    │     User Browser    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │  React + Vite        │
                    │  Cloudflare Pages   │
                    └──────────┬──────────┘
                               │
                          REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼──────────────┐
                 │             │              │
                 ▼             ▼              ▼
        ┌──────────────┐ ┌────────────┐ ┌──────────────┐
        │ Neon         │ │ LeetCode   │ │ Brevo Email  │
        │ PostgreSQL   │ │ GraphQL API│ │ Service      │
        │              │ │            │ │              │
        │ Contact Data │ │ Coding     │ │ Email        │
        │              │ │ Statistics │ │ Notifications│
        └──────────────┘ └────────────┘ └──────────────┘
```

---

# 📁 Project Structure

```text
ShivaMai-Portfolio/
│
├── shivamai-portfolio-frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProjectCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── LeetCode.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── styles/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.development
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── shivamai-portfolio-backend/
│   │
│   ├── src/main/java/com/shivamai/portfolio_backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── service/
│   │   └── entity/
│   │
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   │
│   ├── Dockerfile
│   └── pom.xml
│
└── README.md
```

---

# 🚀 Running Project Locally

The application consists of two independently running applications:

1. Spring Boot Backend
2. React + Vite Frontend

## 1️⃣ Backend Setup

### Step 1: Navigate to backend folder

```bash
cd shivamai-portfolio-backend
```

### Step 2: Configure the database

Configure your local MySQL database and application properties.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shivamai_portfolio
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

### Step 3: Run Spring Boot application

```bash
mvn spring-boot:run
```

### Step 4: Verify backend

Open:

```text
http://localhost:8080/
```

Expected response:

```json
{
  "status": "UP",
  "application": "ShivaMai Portfolio API"
}
```

---

## 2️⃣ Frontend Setup

### Step 1: Open another terminal

Navigate to:

```bash
cd shivamai-portfolio-frontend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure API URL

Create `.env.development`:

```properties
VITE_API_BASE_URL=http://localhost:8080
```

### Step 4: Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🔑 Environment Configuration

The application uses environment-based configuration to separate local development and production environments.

## Frontend Configuration

```properties
# Local Development
VITE_API_BASE_URL=http://localhost:8080
```

Production:

```properties
VITE_API_BASE_URL=https://shivamai-portfolio.onrender.com
```

## Backend Configuration

Production environment uses:

```properties
SPRING_PROFILES_ACTIVE=prod
FRONTEND_URL=https://shivamai-portfolio.pages.dev
```

Configure database credentials and email service credentials through the appropriate environment variables and application configuration.

### Security Notes

- Never commit database passwords or API credentials.
- Keep production secrets inside hosting platform environment settings.
- Use separate configuration for local and production environments.
- Do not expose private credentials in frontend environment variables.

---

# 📊 LeetCode Integration

The portfolio integrates with the LeetCode GraphQL API through the Spring Boot backend.

## Available Statistics

- Total solved problems
- Easy, Medium, and Hard problem breakdown
- Total accepted submissions
- Global ranking
- Earned badges
- Upcoming challenges
- Historical submission activity

## Backend API

```http
GET /api/leetcode/stats
```

The backend retrieves LeetCode profile information and maps the response into a structured DTO.

The React frontend consumes this REST endpoint to render the LeetCode dashboard.

---

# 📬 Contact Form Integration

The portfolio includes a backend-powered contact form.

### Processing Flow

1. Visitor submits the contact form.
2. React frontend sends the request to the Spring Boot backend.
3. Backend validates the submitted information.
4. Contact information is persisted in PostgreSQL.
5. Email notification is sent through Brevo.

---

# ☁️ Deployment Architecture

| Layer | Platform |
|---|---|
| Frontend Hosting | Cloudflare Pages |
| Backend Hosting | Render |
| Database Hosting | Neon PostgreSQL |
| Containerization | Docker |
| Version Control | GitHub |
| Email Service | Brevo |

---

# 🛡 Production Features

- RESTful backend architecture
- React component-based frontend
- Spring Boot service and controller separation
- Database persistence using Spring Data JPA
- PostgreSQL production database
- CORS configuration for frontend-backend communication
- Environment-based configuration
- Docker-supported backend
- Cloud-hosted frontend and backend
- External API integration
- Backend validation and error handling

---

# 👨‍💻 Author

**Sachin Rajesh Mogaronkar**

Software Developer | Java Backend Engineer

- GitHub: https://github.com/
- LinkedIn: https://linkedin.com/in/sachin-mogaronkar3117
- Portfolio: https://shivamai-portfolio.pages.dev

---

<p align="center">
  <b>Built with craftsmanship, integrity, and purpose.</b>
  <br/>
  <sub>Powered by ShivaMai Systems</sub>
</p>
