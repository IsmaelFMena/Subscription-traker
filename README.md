# SubscriptionTraker 🚀

A professional and efficient subscription management application designed to help users track their recurring expenses and optimize their monthly budget. Built with modern web technologies, it offers a seamless and responsive experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Key Features

- **📊 Comprehensive Dashboard**: Get an immediate overview of your total monthly subscription costs.
- **📝 Subscription Management**: Easily add, edit, and delete your subscriptions with a clean interface.
- **🔐 Secure Authentication**: Integrated with Firebase Authentication to keep your data private and accessible only to you.
- **⚡ Real-time Updates**: Powered by Cloud Firestore, ensuring your data is always synced across sessions.
- **🎨 Modern UI**: Styled with Tailwind CSS v4 and featuring the elegant Catppuccin color palette for a professional look and feel.
- **📱 Fully Responsive**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend Library**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- npm or yarn
- A Firebase project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/SubscriptionTraker.git
   cd SubscriptionTraker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Firebase Setup:**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password or Google).
   - Create a **Firestore Database**.
   - Update the configuration in `src/services/firebase.js` with your project's credentials.

   *Note: For production environments, it is recommended to use environment variables (`.env`).*

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

## 📦 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Compiles the application into static files for production in the `dist/` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |

## 📁 Project Structure

```
SubscriptionTraker/
├── src/
│   ├── components/       # Reusable UI and Layout components
│   ├── context/          # Global state management (Auth)
│   ├── hooks/            # Custom hooks for data fetching
│   ├── pages/            # Main application views/routes
│   ├── services/         # External service configurations (Firebase)
│   ├── utils/            # Helper functions and utilities
│   └── App.jsx           # Main App component and routing
├── public/               # Static assets
└── vite.config.js        # Vite configuration and aliases
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/SubscriptionTraker/issues).

---
*Developed with ❤️ for better financial tracking.*
