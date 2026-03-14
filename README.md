# Secure Learning Management System (LMS) Backend

A secure backend system for a Learning Management Platform that supports authentication, course management, media uploads, and online payments.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Razorpay Payment Gateway**
- **Cloudinary**

---

## ✨ Features

- JWT-based Authentication and Authorization
- Course Management APIs
- Secure Payment Integration using Razorpay
- Media Upload and Storage via Cloudinary
- RESTful API Architecture
- Scalable Backend Structure

---

## ⚙️ Environment Variables

Before running the project, create a **`.env`** file in the root directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
