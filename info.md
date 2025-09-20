[cite_start]This document outlines the requirements for the **Project Submission & Review API (Deployable)** technical task[cite: 5]. [cite_start]The objective is to **build a secure, scalable backend system** for Joineazy, enabling students to submit projects and administrators to review them[cite: 7, 6].

[cite_start]The project must demonstrate proficiency in backend API design, file handling, authentication, Dockerization, PostgreSQL integration, and deployment on Ubuntu-based infrastructure[cite: 8, 4].

## Core Requirements and Stack

[cite_start]The required technical stack is **Node.js + Express + PostgreSQL** [cite: 44][cite_start], built as a **RESTful API**[cite: 45]. [cite_start]The system must implement **JWT-based authentication** and **Role-based access** for `student` and `admin` roles[cite: 47, 48].

### Functional Scope

| Role | [cite_start]Actions [cite: 32, 38] |
| :--- | :--- |
| **Student** | [cite_start]Submit a project including a **title** (string), **summary** (text), and an **uploadable file**[cite: 33, 34, 35, 36]. [cite_start]Viewing submission status is optional[cite: 37]. |
| **Admin** | [cite_start]Securely log in[cite: 39]. [cite_start]View all submitted projects[cite: 40]. [cite_start]Review projects and leave comments[cite: 41]. [cite_start]Trigger (or simulate) an email to the student upon review submission[cite: 42]. |

### File Handling

* [cite_start]Use a library for file uploads[cite: 53].
* [cite_start]Files must be stored in an **`uploads` directory**[cite: 54].
* [cite_start]Store **file path and metadata** (e.g., filename, path) in the PostgreSQL database, **NOT the binary file data**[cite: 49, 55].

---

## Bonus Features (Optional)

[cite_start]Implementing these features will be a bonus[cite: 61]:

* [cite_start]**Deployment to Azure:** The public endpoint should be **SSH-accessible**[cite: 63, 64]. [cite_start]Use **NGINX** or serve directly from Express[cite: 65].
* [cite_start]**Rate Limiting:** Protect sensitive routes using a rate limiter (e.g., `express-rate-limit`)[cite: 66, 67].
* [cite_start]**Basic Email Notification:** On admin review, **send** an actual email using **NodeMailer** or **simulate** the email using a **console log**[cite: 68, 69, 70, 71].

---

## Required Submission Items

| Deliverable | [cite_start]Details [cite: 12, 72] |
| :--- | :--- |
| **Code** | [cite_start]**GitHub Repository** with an organized, modular codebase and clear commit history[cite: 13, 14, 15, 73]. |
| **Documentation** | [cite_start]**Technical Write-Up (`README.md`)** including an overview of implementation, tech stack, API endpoints, auth logic, file handling explanation, and deployment instructions[cite: 20, 22, 23, 24, 25, 26, 27, 74]. |
| **Demonstration** | [cite_start]Working demo (via Docker or hosted)[cite: 16, 75]. |
| **Interview Readiness** | [cite_start]Be prepared to walk through your architecture, deployment process, and DevOps decisions[cite: 28, 29, 76]. [cite_start]The interview will focus on performance, scalability, and security[cite: 78]. |
