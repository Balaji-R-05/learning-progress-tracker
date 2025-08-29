# Learning Progress Tracker API

This is a backend RESTful API built with **Node.js**, **Express**, and **MongoDB**. It supports user registration, authentication, course management, enrollment, and progress tracking.

## 📚 Features

- ✅ User Registration & Login with JWT
- ✅ Role-based Access (User/Admin)
- ✅ Course Creation, Update & Deletion (Admin)
- ✅ Course Enrollment
- ✅ Track Completed Modules per User
- ✅ View Progress Percentage
- ✅ PDF Certificate Generation with QR Code & Signature
- ✅ Email Notifications on Registration & Enrollment
- ✅ User Profile Update (Bio + Avatar Upload)
- ✅ API Rate Limiting (Abuse Protection)
- ✅ Swagger Documentation
- ✅ Postman Collection

## 🚀 Future Improvements

- Add unit and integration tests
- Implement password reset functionality

## ⚙️ Tech Stack

| Category       | Stack                        |
|----------------|------------------------------|
| Runtime        | Node.js                      |
| Framework      | Express.js                   |
| Database       | MongoDB + Mongoose           |
| Authentication | JWT                          |
| File Uploads   | Multer                       |
| PDF/QR         | PDFKit, node-qrcode          |
| Emails         | Nodemailer                   |
| Docs           | Swagger (OpenAPI)            |

## Setup Environment Variables
### Create a .env file in the root:
PORT=5000
MONGO_URI=<mongodb::connection_string>
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

### Run the Server
```
npm run dev
```
Server will start on: http://localhost:5000

```bash
git clone https://github.com/Balaji-R-05/learning-progress-tracker.git
cd learning-progress-tracker
npm install
npm run dev
```