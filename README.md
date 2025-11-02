# FUND IT - Crowdfunding Web Application (MERN) 

Fund It is a full-stack crowdfunding platform built using the MERN stack. It enables users to create, manage, and explore fundraising campaigns with ease. The platform includes user authentication, campaign management, image hosting, and a chat feature, offering a complete end-to-end experience.



## Live Demo

**https://crowdfunding-2wma.onrender.com**  
> Hosted on Render (cold starts may occur)



## Features

- **Secure Authentication**
  - JWT-based login & registration
  - Email verification (Nodemailer)
- **Campaign Management**
  - Create, update, and delete campaigns
  - Upload campaign images via Cloudinary
- **Explore Campaigns**
  - Tag-based search and filtering
- **Chat System**
  - Message and image support
  - Stored in MongoDB  
  *(Non real-time in current version)*
- **Responsive UI** for desktop and mobile



## Tech Stack

### Frontend
- React (Vite)
- Context API + Local State
- Tailwind + Diasy UI + React Bits

### Backend
- Node.js & Express
- MongoDB + Mongoose
- Nodemailer (email verification)
- JSON Web Tokens (JWT)
- Cloudinary (media storage)

### Deployment
- Render (Backend + Static Frontend)



## Screenshots
<img width="1470" height="840" alt="Screenshot 2025-11-02 at 8 41 17 AM" src="https://github.com/user-attachments/assets/6a21301f-6754-4b4c-ac5e-57411e3f4745" />
<img width="1470" height="840" alt="Screenshot 2025-11-02 at 8 01 43 AM" src="https://github.com/user-attachments/assets/5518707c-3135-4b6c-9b4f-be3d08533433" />
<img width="1470" height="797" alt="Screenshot 2025-11-02 at 8 42 29 AM" src="https://github.com/user-attachments/assets/274e9b62-5f85-4578-a7a4-3db09573b74c" />
<img width="1470" height="799" alt="Screenshot 2025-11-02 at 8 43 31 AM" src="https://github.com/user-attachments/assets/dda12518-794b-4aa2-aad0-505b42fca898" />
<img width="1470" height="799" alt="Screenshot 2025-11-02 at 8 43 57 AM" src="https://github.com/user-attachments/assets/73f72b5b-110c-42e7-aac2-941af0ef3fe4" />

## Project Structure

```bash
root
│── frontend/     # React (Vite)
│── backend/      # Express + MongoDB
```

## Installation

### Clone the repository

```base
git clone https://github.com/GlenThevar/CrowdFunding.git
```

### Install dependencies 

```base
npm run build
```
### Environment Variables
Create a .env file inside the backend folder:

```base
MONGO_URL=
PORT=
JWT_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_NAME=
USER_EMAIL=
USER_PASS=
```
### Running the Application

#### Option A: Backend serves frontend (Production-like)

```base
npm run start
```
#### Option B: Run Frontend & Backend Separately (Development)

```base
cd backend && npm run dev
cd frontend && npm run dev
```

## Contributing

Contributions are welcome.

To contribute:
1. **Fork** the repository  
2. **Create** a new feature branch  
3. **Submit** a pull request  
