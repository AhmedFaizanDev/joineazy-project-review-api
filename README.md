# joineazy-project-review-api

This is a customized backend application built for the Joineazy technical task, serving as the **Project Submission & Review API**. It utilizes a **Node.js/Express/PostgreSQL** stack and is fully **Dockerized** for development and deployment on Ubuntu-based infrastructure.

## Key Features Implemented

  * **Secure Authentication:** JWT-based authentication for all API access.
  * **Role-Based Access Control:** Strict authorization logic separates **`student`** (submission) and **`admin`** (review) actions.
  * **File Handling:** Secure project file upload using Multer, storing the file on the server and saving only the file's path/metadata in the database.
  * **Docker Orchestration:** Services for the Node.js backend and PostgreSQL database are managed using `docker-compose.yml`.
  * **Database:** PostgreSQL schema implemented for **`users`**, **`projects`**, and **`reviews`** models.

## Local Setup & Installation

### Prerequisites

1.  Docker and Docker Compose installed.
2.  Node.js (for CLI tools, though the app runs in Docker).
3.  `.env` file configured with database and JWT secrets.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/joineazy-project-review-api.git
    cd joineazy-project-review-api
    ```

2.  **Build and Run Services:**

    ```bash
    docker-compose up --build -d
    ```

3.  **Run Database Migrations (Essential Step):**

      * Since the original Sequelize CLI setup was unstable, schema creation must be done manually if the migrations fail automatically. (Assuming service name is `app`):

    <!-- end list -->

    ```bash
    # Command to run all migrations (preferred method):
    docker-compose exec app npx sequelize-cli db:migrate

    # If migration fails, the schema must be created manually via SQL EXEC commands (used during development).
    ```

## API Endpoints

The API is accessible at `http://localhost:3000`.

### Core Application Routes

| Route | Method | Access | Function |
| :--- | :--- | :--- | :--- |
| `/v1/auth/register` | `POST` | Public | Creates a new user (requires `role: 'student'` or `'admin'` in body). |
| `/v1/auth/login` | `POST` | Public | Logs in a user and returns a JWT. |
| `/api/projects/submit` | `POST` | **Student** | Submits a project (title, summary, file upload). |
| `/api/projects/all` | `GET` | **Admin** | Retrieves all project submissions. |
| `/api/reviews/submit/:projectId` | `POST` | **Admin** | Submits a review/comment for a project (simulates email notification). |

## Technical Write-Up (Implementation Notes)

### Backend Decisions

  * **Stack:** Node.js/Express for the RESTful API architecture.
  * **Authentication:** JWT tokens are generated upon login and used in the `Authorization: Bearer` header for all protected routes.
  * **Authorization:** The custom `grantAccess` middleware utilizes the `role` (a direct string attribute on the `users` table) to restrict access, e.g., only **`admin`** can access `/api/reviews/submit`.

### File Handling

  * File uploads are processed using **Multer** and saved to the `./uploads` directory, which is volume-mapped in `docker-compose.yml` for persistence.
  * The database (`projects` table) stores the file's metadata (`file_name`, `file_path`) but **never the binary data**, following security best practices.

### DevOps & Deployment

  * **Dockerization:** A multi-container setup (`app` + `postgres`) is used for local parity with a production environment.
  * **Deployment (Bonus):** The system is designed to be deployable to **AWS EC2 (Ubuntu)** or any Ubuntu-based cloud VM. The API is served directly from Express but can be placed behind **NGINX** for production (bonus feature).
  * **Email Notification (Bonus):** Upon admin review submission, the system logs a **console message** simulating the email notification to the student, fulfilling the minimum requirement for the email feature.
