# 🚀 Sachin's 3D Developer Portfolio

A high-performance, immersive developer portfolio built with **React**, **Three.js**, and **Tailwind CSS**. This project features a stunning dark-themed UI, smooth animations, and a fully functional **Admin Panel** for dynamic content management.

![Portfolio Preview](public/hero-robot.png)

## ✨ Key Features

- **🎨 Immersive 3D UI**: Powered by `framer-motion` and `tsparticles` for a dynamic user experience.
- **📱 Fully Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
- **🛠 Admin Dashboard**: Manage projects and experiences dynamically without touching code.
- **☁️ AWS S3 Integration**: Upload project images directly to an S3 bucket from the Admin Panel.
- **📧 Contact Form**: Fully functional contact form integrated with **EmailJS**.
- **🔒 Secure Authentication**: Admin routes protected via **Firebase Authentication**.
- **🎵 Interactive Elements**: Custom cursor, background music player, and sound effects.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend / Database**: Firebase (Firestore & Auth)
- **Storage**: AWS S3 (for image hosting)
- **Email Service**: EmailJS
- **Icons**: React Icons (Fa, Si)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/sachinkumarnke/Portfolio-.git
cd Portfolio-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your keys (see `.env.example`):

```env
# EmailJS
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key

# AWS S3


# Firebase
VITE_APP_FIREBASE_API_KEY=your_api_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_APP_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_FIREBASE_APP_ID=your_app_id
VITE_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Footer, etc.)
│   └── admin/        # Admin panel components (Dashboard, Forms)
├── utils/            # Utility functions (S3 service, helpers)
├── App.jsx           # Main application component & Routing
├── index.css         # Global styles & Tailwind directives
└── main.jsx          # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
