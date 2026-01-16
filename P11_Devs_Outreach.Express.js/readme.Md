# Social Media API — Full Documentation

A complete backend for a social media app built with **Node.js**, **Express**, **MongoDB**, and **Multer**.

---

## 🚀 Features

* User registration, login, verification
* Follow / Unfollow users
* Create, like, comment, reply on posts
* Report posts, comments, and users
* Edit comments, reply to comments
* User profile update (bio, profile picture)
* Story upload (single/multiple)
* JWT authentication
* Multer-based file uploads

---

# 📁 Project Structure

```
/project
│── index.js
│── controllers/
│── middlewares/
│── models/
│── config/
│── uploads/
└── README.md
```

---

# ⚙️ Setup Instructions

### 1. Install dependencies

```
npm install
```

### 2. Environment variables (`.env`)

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

### 3. Start server

```
npm start
```

---

# 🔐 Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

Token is received on successful login.

---

# 🧪 API Documentation

Below is the **complete API test guide** for Postman or Thunder Client.

---

# 📌 USER ROUTES

## **1. Register User**

`POST /user/register`

### Body (JSON)

```
{
  "username": "ify",
  "email": "ify@example.com",
  "password": "123456"
}
```

### Response

```
{
  "success": true,
  "message": "User registered"
}
```

---

## **2. Login User**

`POST /user/login`

### Body

```
{
  "email": "ify@example.com",
  "password": "123456"
}
```

### Response

```
{
  "token": "<jwt-token>",
  "user": { ... }
}
```

---

## **3. Verify Logged-in User**

`GET /user/verify`

### Headers

```
Authorization: Bearer <token>
```

### Response

```
{
  "user": { ... }
}
```

---

## **4. Update Bio**

`POST /user/bio`

### Body

```
{
    "bio": "Software developer & creator"
}
```

---

## **5. Upload Profile Picture**

`POST /user/profile-pic`

### Form‑Data

| Key        | Type | Value     |
| ---------- | ---- | --------- |
| profilePic | File | image.png |

---

## **6. Follow User**

`POST /user/follow`

### Body

```
{
  "targetUserId": "656df91e..."
}
```

---

## **7. Unfollow User**

`POST /user/unfollow`

### Body

```
{
  "targetUserId": "656df91e..."
}
```

---

## **8. Report User**

`POST /user/report`

### Body

```
{
  "userId": "656df91e...",
  "reportText": "Spam account"
}
```

---

# 📝 POST ROUTES

## **1. Create Post**

`POST /post/create`

### Form‑Data

| Key         | Type | Value         |
| ----------- | ---- | ------------- |
| postPic     | File | photo.jpg     |
| postCaption | Text | "Hello world" |

---

## **2. Like Post**

`GET /post/like?postId=<postId>`

### Response

```
{
  "message": "Post liked"
}
```

---

## **3. Comment on Post**

`POST /post/comment`

### Body

```
{
  "postId": "656df91e...",
  "text": "Nice post!"
}
```

---

## **4. Edit Comment**

`POST /post/comment/edit`

### Body

```
{
  "postId": "656df91e...",
  "commentId": "77sd9c...",
  "newText": "Updated comment text"
}
```

---

## **5. Reply to Comment**

`POST /post/comment/reply`

### Body

```
{
  "postId": "656df91e...",
  "commentId": "77sd9c...",
  "text": "Thanks!"
}
```

---

## **6. Report Comment**

`POST /post/comment/report`

### Body

```
{
  "postId": "656df91e...",
  "commentId": "77sd9c...",
  "reportText": "Abusive language"
}
```

---

## **7. Report Post**

`POST /post/report`

### Body

```
{
  "postId": "656df91e...",
  "reportText": "Violates community guidelines"
}
```

---

# 📚 STORY ROUTES

## **1. Upload Story**

`POST /story/upload`

### Form‑Data

| Key   | Type | Value     |
| ----- | ---- | --------- |
| story | File | photo.png |

---

## **2. Upload Multiple Stories**

`POST /story/upload/multiple`

### Form‑Data

| Key     | Type   | Value          |
| ------- | ------ | -------------- |
| stories | File[] | multiple files |

---

# 🧾 Response Format

All responses follow:

```
{
  "success": true/false,
  "message": "...",
  "data": {}
}
```

---

# 🛡 Error Handling

Common errors include:

* Invalid token
* File upload missing
* User not found
* Post not found
* Comment not found
* Already followed / already liked

---

# 📤 File Upload Notes

Uploads stored in `/uploads/` directory.
You may switch to AWS S3, Cloudinary, or Firebase easily.

---

# 🧑‍💻 Author

Backend written by **Irfan (Ify)**.

If you want I can also generate:
✅ Postman collection JSON
✅ API diagram / flowchart
