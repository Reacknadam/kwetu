# Kwetu - A Modern Media Blog

Kwetu is a modern, elegant, and premium blog platform built with React, Vite, and Firebase. It is designed to mimic the aesthetic of professional news media sites like The Guardian and Radio Okapi, with a focus on clean design, performance, and a complete admin dashboard for content management.

## Features

- **Premium Design**: Mobile-first, responsive design with a focus on typography, generous spacing, and a clean aesthetic.
- **Light/Dark Theme**: Auto-detects system preference with a manual toggle.
- **Complete Admin Dashboard**: Full CRUD for articles, comment moderation, contact message management, and newsletter subscriber list.
- **Firebase Integration**: Uses Firestore for the database, Firebase Authentication for admin login, and Firebase Storage for image uploads.
- **SEO Optimized**: Dynamic meta tags for articles using `@dr.pogodin/react-helmet`.
- **Monetization Ready**: Placeholders for Google AdSense ads.

## Tech Stack

- **Frontend**: React 18, Vite 5
- **Backend**: Firebase (Firestore, Authentication, Storage, Hosting)
- **Styling**: Pure CSS with CSS Modules
- **Routing**: React Router
- **Rich Text Editor**: Quill.js (to be implemented)
- **Charts**: Chart.js (to be implemented)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kwetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
- Create a `.env` file in the root of the project by copying the example file:
```bash
cp .env.example .env
```
- Open the `.env` file and replace the placeholder values with your actual Firebase project configuration. You can find these in your Firebase project settings.

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 5. Deploy to Firebase
To deploy the application to Firebase Hosting, run the following command:
```bash
npm run deploy
```
This will build the project and deploy the `dist` directory to Firebase Hosting.
