# 🚨 Disaster Relief Coordination Platform

A comprehensive full-stack web application designed to streamline disaster relief operations by connecting survivors, NGOs, suppliers, and volunteers in real-time. This platform facilitates efficient resource management, request tracking, and communication during emergency situations.

![Project Banner](Frontend/public/logo_name.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Team](#team)

## 🌟 Overview

The Disaster Relief Coordination Platform is designed to address the critical challenges faced during natural disasters and emergencies. It provides a centralized system where:

- **Survivors** can report their needs and track assistance
- **NGOs** can manage requests, coordinate donations, and track impact
- **Suppliers** can manage inventory and fulfill orders
- **Volunteers** can contribute and stay informed

The platform features real-time communication, intelligent resource matching, and comprehensive tracking capabilities to ensure efficient disaster response.

## ✨ Features

### Core Features
- 🔐 **Authentication & Authorization**: Secure login with JWT and Google OAuth
- 👥 **Multi-Role System**: Separate dashboards for Survivors, NGOs, Suppliers, and Volunteers
- 💬 **Real-Time Chat**: Socket.IO powered communication between stakeholders
- 📊 **Resource Management**: Comprehensive inventory and request tracking
- 🗺️ **Interactive Maps**: Location-based services for camps and resources
- 📈 **Impact Tracking**: Monitor and visualize relief efforts
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- 🎨 **Theme Support**: Dark/Light mode toggle

### Dashboard Features

#### Survivor Dashboard
- Report emergency needs
- Track request status
- View nearby NGOs
- Access emergency information
- Real-time updates on aid delivery
- Get access to a dedicated chat room for their requests

#### NGO Dashboard
- Manage donation requests
- Track fulfillment status
- Create new aid requests
- Impact tracking and analytics
- Communication hub
- Profile management

#### Supplier Dashboard
- Manage inventory
- View and fulfill orders
- Delivery tracking
- Order history
- Communication with NGOs

#### Volunteer Page
- View ongoing relief efforts
- Communication center
- Resource information
- Community engagement

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **Real-Time**: Socket.IO Client

### Backend
- **Runtime**: Node.js with Express.js v5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js (Google OAuth 2.0)
- **Real-Time**: Socket.IO
- **Security**: bcrypt, cookie-parser
- **Environment**: dotenv

## 📁 Project Structure

```
Disaster-relief-coordination-platform/
├── Backend/
│   ├── constants/          # Application constants
│   ├── controllers/        # Route controllers
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── fulfillment.js
│   │   ├── inventory.js
│   │   ├── ngo.js
│   │   ├── request.js
│   │   └── supplier.js
│   ├── middlewares/        # Custom middleware
│   │   ├── checkUserType.js
│   │   └── isAuthenticated.js
│   ├── models/             # Mongoose schemas
│   │   ├── Feedback.js
│   │   ├── FulfillmentRequest.js
│   │   ├── Inventory.js
│   │   ├── Ngo.js
│   │   ├── Request.js
│   │   ├── Supplier.js
│   │   └── User.js
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── index.js            # Server entry point
│   └── package.json
│
├── Frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and resources
│   │   ├── components/     # Reusable components
│   │   │   ├── Card.jsx
│   │   │   ├── ChatModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PillNavbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── constants/      # Application constants
│   │   ├── context/        # React contexts
│   │   ├── pages/          # Page components
│   │   │   ├── NgoDashboard/
│   │   │   ├── SupplierDashboard/
│   │   │   ├── SurvivorDashboard/
│   │   │   └── VolunteerPage/
│   │   ├── store/          # Redux store
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noughtsad/Disaster-relief-coordination-platform.git
   cd Disaster-relief-coordination-platform
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
Create a `.env` file in the `Frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Running the Application

#### Development Mode

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd Frontend
   npm run dev
   ```
   The application will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

#### Production Build

1. **Build the Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start the Backend**
   ```bash
   cd Backend
   npm start
   ```

## 👨‍💻 Team

- **Rudra** - [Profile](https://github.com/rudralaheri)
- **Saad** - [Profile](https://github.com/noughtsad)
- **Sambhav** - [Profile](https://github.com/Sambhav-3010)

---