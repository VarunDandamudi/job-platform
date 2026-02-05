# Job Platform

A modern, full-stack Job Platform application designed to connect candidates with opportunities. This application features a robust backend built with Spring Boot and a dynamic frontend powered by React, offering features like job posting, application management, and AI-driven job recommendations.

**[View Live Demo on Vercel](https://job-platform-sage.vercel.app)**

## 🚀 Features

- **User Authentication**: Secure Sign Up and Login functionality using JWT (JSON Web Tokens).
- **Job Management**:
  - **Post Jobs**: Recruiters can easily create and manage job listings.
  - **View Jobs**: Candidates can browse available job openings.
- **Smart Recommendations**: customized job recommendations for candidates (AI/Algorithm based).
- **Application System**: streamlined process for candidates to apply to jobs.
- **Resume Handling**: Upload and management of candidate resumes.
- **Responsive Design**: Modern UI/UX using React and Particles for an engaging visual experience.

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Bootstrap Icons, Custom CSS
- **Visual Effects**: TSParticles
- **Language**: JavaScript (ES6+)

### Backend
- **Framework**: Spring Boot 3.5.3
- **Language**: Java 24
- **Database**: MongoDB (Spring Data MongoDB)
- **Security**: Spring Security, JWT (JJWT)
- **Build Tool**: Maven

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### Prerequisites
- **Node.js**: v18 or higher
- **Java JDK**: v24 (or compatible recent version)
- **MongoDB**: A running MongoDB instance (Local or Atlas)
- **Maven**: (Optional, generic wrapper included)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd job-platform/backend
    ```

2.  Configure Database:
    Open `src/main/resources/application.properties` and verify your MongoDB connection string (`spring.data.mongodb.uri`).
    *Note: It is recommended to use environment variables for security.*

3.  Run the Application:
    You can use the Maven wrapper to start the server:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend server will start at `http://localhost:8080`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd job-platform/frontend
    ```

2.  Install Dependencies:
    ```bash
    npm install
    ```

3.  Start the Development Server:
    ```bash
    npm start
    ```
    The application will run at `http://localhost:3000`.

## 📂 Project Structure

```
job-platform/
├── backend/                 # Spring Boot Server
│   ├── src/main/java/       # Java Source Code
│   │   ├── controller/      # API Endpoints (Auth, Job, Resume)
│   │   ├── model/           # Database Models
│   │   ├── repository/      # Data Access Layer
│   │   ├── service/         # Business Logic
│   │   └── config/          # App Configurations
│   └── pom.xml              # Maven Dependencies
│
└── frontend/                # React Application
    ├── public/              # Static Assets
    └── src/
        ├── components/      # Reusable UI Components
        ├── pages/           # Application Pages (Login, Post Job, etc.)
        ├── context/         # React Context (Auth State)
        └── api/             # API Connectors
```

## 🔗 API Endpoints

The backend exposes several RESTful endpoints. Key controllers include:

- **AuthController**: `/auth` (Login, Signup)
- **JobPostingController**: `/jobs` (Create, List, View Jobs)
- **ResumeController**: `/resume` (Upload, Parsing)

---
*Created by Varun Dandamudi features modern full-stack development practices.*
