# 📝 MyBlogApp

**Blog+** is a full-stack blogging platform where users can sign up, create, manage, and publish blog posts. Anyone can view public blogs, while logged-in users can manage their own blogs securely.

---

## 🚀 Features

- 🧑‍💻 User authentication using JWT
- ✍️ Create, edit, delete blogs
- 🌍 Public blog listing with pagination
- ✅ Toggle blog publish status
- 📱 Fully responsive UI
- 🔐 Protected routes and secure APIs

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Authentication
- CORS
- Zod

**Deployment:**
- Frontend: Vercel , url:https://omnify-blog-app-frontend.vercel.app/
- Backend: Render
- Database: MongoDB Atlas

---

## ⚙️ Environment Variables

### Frontend `.env` file:
- VITE_API_URL=BACKEND_HOSTED_URL

### Backend `.env` file:
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
