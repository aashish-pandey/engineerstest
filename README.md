# Engineer's test

A quiz application that allows users to take a test and view their score. Built using a containerized architecture with:

- **Frontend:** React
- **Backend:** Node.js (Express)
- **API Layer:** Separate Express service
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

---

## 🏗️ Features

- Take a quiz with multiple-choice questions
- View score instantly after submission
- Modular backend architecture
- Fully Dockerized and isolated services
- CI/CD-ready setup

---

## 📁 Folder Structure

```
.
├── backend/                # Express backend
├── frontend/               # React frontend
├── api/                    # Quiz API service
├── docker-compose.yml      # Orchestrates services
├── start.sh                # Shell script to start containers
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

### 2. Start the App

```bash
chmod +x start.sh
./start.sh
```

Or manually:

```bash
docker-compose up --build
```

Frontend will be available at: `http://localhost:5173`  
API/Backend runs at: `http://localhost:3000`

---

## 🐳 Docker Services

| Service      | Port   | Description                   |
|--------------|--------|-------------------------------|
| frontend     | 5173   | React App                     |
| api          | 3000   | Quiz API Server               |
| backend      | 3001   | Additional Backend Services   |
| db           | 5432   | PostgreSQL Database           |

---

## 📦 Environment Variables

Create a `.env` file (if needed) to set up DB connection and port configs.

---

## 🧪 Sample Quiz JSON

```json
[
  {
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "answer": "Paris"
  }
]
```

---

## 🔐 CORS Handling

CORS is handled on the backend for frontend-to-API communication across containers.



## 🛠️ Tech Stack

- **React** 
- **Node.js** + **Express**
- **PostgreSQL**
- **Docker + Compose**

---

## 🙌 Author

**Aashish Pandey**  
[LinkedIn](https://www.linkedin.com/in/aashish-prashad-pandey-02388a1a7/) | [GitHub](https://github.com/aashish-pandey)

---

