# 🚀 TaskFlow

TaskFlow is a **full-stack task management application** built with **Laravel 10 (backend)** and **React + Vite + Tailwind (frontend)**.  
It helps teams organize and track their daily tasks efficiently, with role-based access for **Admins** and **Users**.

---

## ✨ Features

### 👑 Admin
- Manage all users (create, edit, delete).
- Manage all tasks in the system.
- Assign tasks to users.
- View dashboards with an overview of:
  - Total tasks
  - Tasks assigned to users
  - User statistics

### 👤 User
- Create, edit, and delete tasks.
- Assign tasks they create to other users.
- View dashboards with:
  - Tasks they created
  - Tasks assigned to them by others

---

## 🛠️ Tech Stack

### Backend
- [Laravel 10](https://laravel.com/) – PHP framework
- [Sanctum](https://laravel.com/docs/sanctum) – API authentication
- [Laratrust](https://github.com/santigarcor/laratrust) – Role & permissions management
- [Inertia.js](https://inertiajs.com/) – Backend ↔ Frontend bridge
- [Ziggy](https://github.com/tighten/ziggy) – Route helper

### Frontend
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) – Fast dev bundler
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Headless UI](https://headlessui.dev/) – Accessible UI components
- [Heroicons](https://heroicons.com/) & [Lucide React](https://lucide.dev/) – Icons
- [SweetAlert2](https://sweetalert2.github.io/) – Alerts & confirmations
- [React Hot Toast](https://react-hot-toast.com/) – Notifications
- [Axios](https://axios-http.com/) – API requests

---

## 📂 Project Structure

TaskFlow/ ├── backend/ (Laravel app) │   ├── app/ │   ├── database/ │   ├── routes/ │   └── ... ├── frontend/ (React + Vite app via Inertia) │   ├── resources/js/ │   ├── resources/views/ │   └── ... ├── composer.json ├── package.json └── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow

2. Backend (Laravel)

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations (with seeders if any)
php artisan migrate --seed

# Start Laravel server
php artisan serve

3. Frontend (React + Vite)

# Install JS dependencies
npm install

# Start Vite dev server
npm run dev


---

🔑 Roles & Permissions

Admin
Can manage all users & tasks, assign tasks, and view global dashboards.

User
Can manage their own tasks, assign them to others, and view personal dashboards.


Roles and permissions are managed with Laratrust.


---

📊 Dashboards

Admin Dashboard → Overview of all users and tasks.

User Dashboard → Overview of personal tasks and tasks assigned to them.



---

📜 Scripts

Laravel

php artisan serve        # Run backend server
php artisan migrate:fresh --seed   # Reset DB with seeders

Frontend

npm run dev     # Start Vite dev server
npm run build   # Build frontend for production


---

🤝 Acknowledgments

Laravel

React

Vite

Tailwind CSS

Laratrust

Inertia.js



---

📄 License

This project is open-source and available under the MIT License.


---
