# 🧑‍💼 Employee Management System
**COMP3133 Assignment 2 – Full Stack Web Application**

---

## 🔗 Live Demo Links

- 🔹 **Frontend (Angular App):** [https://101413469-comp3133-assignment2.vercel.app](https://101413469-comp3133-assignment2.vercel.app)
- 🔹 **Backend (GraphQL API):** [https://one01413469-comp3133-assignment2.onrender.com/graphql](https://one01413469-comp3133-assignment2.onrender.com/graphql)

---

## 📁 Project Structure

```
101413469_comp3133_assignment2/
├── backend/       → Node.js + GraphQL + MongoDB
├── frontend/      → Angular 16 + Apollo Client
```

---

## ✅ Features

- 🔒 **User Authentication** (Signup / Login) with JWT
- 📄 **Add, View, Edit, Delete Employees**
- 🔍 **Search by Designation / Department**
- 🖼️ Upload employee profile image (URL-based)
- 🚀 **GraphQL API** with Queries & Mutations
- 🌐 **MongoDB Atlas** as cloud database
- 🖥️ **Deployed with Vercel (Frontend)** and **Render (Backend)**
- 💡 **Responsive and modern UI** with Angular Standalone Components
- 🧠 **Form validation** with error messages shown in the UI

---

## 🛠️ Technologies Used

### Frontend
- Angular 16
- Apollo Angular
- RxJS
- Angular Forms
- Angular Material (optional)

### Backend
- Node.js
- Express.js
- GraphQL
- Mongoose
- JWT (Authentication)

### Database
- MongoDB Atlas

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🧑‍💻 Local Development Setup

### 🔹 Prerequisites

- Node.js (LTS recommended)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB Atlas or local MongoDB
- Git

---

### 🔧 Backend Setup (Node.js + GraphQL)

```bash
cd backend/
npm install
```

🔐 Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

▶️ Start the backend server:

```bash
npm start
```

> 🚀 Server runs at: [http://localhost:5000/graphql](http://localhost:5000/graphql)

---

### 🔧 Frontend Setup (Angular)

```bash
cd frontend/
npm install
```

Ensure the correct backend URL is used in:

#### 📁 `src/environments/environment.ts` (Development)
```ts
export const environment = {
  production: false,
  graphqlEndpoint: 'http://localhost:5000/graphql'
};
```

#### 📁 `src/environments/environment.prod.ts` (Production)
```ts
export const environment = {
  production: true,
  graphqlEndpoint: 'https://one01413469-comp3133-assignment2.onrender.com/graphql'
};
```

▶️ Run the Angular app:

```bash
ng serve
```

> 🌐 App runs on: [http://localhost:4200](http://localhost:4200)

---

## 🧪 How to Use

1. 🔐 **Login / Signup**
   - Create a new user account or log in.
2. 👥 **Manage Employees**
   - View all employees.
   - Add a new employee.
   - Edit or delete existing records.
3. 🔍 **Search**
   - Filter employees by designation or department.
4. 🛡️ **Validation**
   - Duplicate email shows error: "This email is already registered."
   - Minimum salary validation: "Salary must be at least $1000."
   - All error messages appear in the UI.

---

## 🌐 Deployment Notes

### ✅ Backend (Render)
- Hosted at: [https://one01413469-comp3133-assignment2.onrender.com/graphql](https://one01413469-comp3133-assignment2.onrender.com/graphql)

### ✅ Frontend (Vercel)
- Hosted at: [https://101413469-comp3133-assignment2.vercel.app](https://101413469-comp3133-assignment2.vercel.app)

---

## 🧑‍🎓 Student Information

- 👤 **Name:** Mohmadsahil Shaikh
- 🆔 **Student ID:** 101413469
- 📚 **Course:** COMP3133 – Full Stack Development
- 📅 **Semester:** Winter 2025

---

## 📄 License

This project is submitted for academic purposes as part of COMP3133 – Full Stack Development.

