
TaskFlow is a **full-stack task management application** built with **Laravel 10 + Breeze + Inertia.js (React)**.  
It helps teams organize and track their daily tasks efficiently, with role-based access for **Admins** and **Users**.

---

## ✨ Features

### 👑 Admin
- Manage all users (create, edit, delete).
- Manage all tasks in the system.
- Assign tasks to users.
- Dashboard overview of:
  - Total tasks
  - Tasks assigned to users
  - User statistics

### 👤 User
- Create, edit, and delete their own tasks.
- Assign tasks they create to other users.
- Dashboard overview of:
  - Tasks they created
  - Tasks assigned to them

---

## 🛠️ Tech Stack

### Backend
- [Laravel 10](https://laravel.com/) – PHP framework
- [Sanctum](https://laravel.com/docs/sanctum) – API authentication
- [Laratrust](https://github.com/santigarcor/laratrust) – Role & permissions
- [Inertia.js (Laravel Adapter)](https://inertiajs.com/) – Server ↔ Client bridge
- [Ziggy](https://github.com/tighten/ziggy) – Route helper

### Frontend
- [React 18](https://react.dev/) – via Breeze + Inertia
- [Vite](https://vitejs.dev/) – Bundler
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Headless UI](https://headlessui.dev/) – Accessible components
- [Heroicons](https://heroicons.com/) & [Lucide React](https://lucide.dev/) – Icons
- [SweetAlert2](https://sweetalert2.github.io/) – Alerts
- [React Hot Toast](https://react-hot-toast.com/) – Notifications
- [Axios](https://axios-http.com/) – API requests

---

## 📂 Project Structure

TaskFlow/ 
├── app/ 
├── bootstrap/ 
├── config/ 
├── database/
├── public/
├── resources/ 
│   ├── css/ 
│   └── js/   
<-- React + Inertia components live here 
│       ├── Pages/ 
│       ├── Components/
│       └── App.jsx
├── routes/ 
│   ├── web.php 
│   └── api.php 
├── storage/ 
├── composer.json 
├── package.json 
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow

2. Backend & Frontend (single project)

```bash
# Install PHP dependencies
composer install

```bash
# Install Node dependencies
npm install

```bash
# Copy environment file
cp .env.example .env

```bash
# Generate app key
php artisan key:generate

```bash
# Run migrations (with seeders if any)
php artisan migrate --seed

```bash
# Start Laravel server
php artisan serve

```bash
# Start Vite dev server (for React refresh)
npm run dev


---

🔑 Roles & Permissions

Admin
Can manage users & all tasks, assign tasks, and view global dashboards.

User
Can manage their own tasks, assign tasks they created, and view personal dashboards.


Roles and permissions are handled via Laratrust.


---

📜 Useful Commands

Laravel
```bash
php artisan serve                     # Run backend server
```bash
php artisan migrate:fresh --seed      # Reset DB with seeders

Frontend (via Vite)
```bash
npm run dev     # Start dev server
```bash
npm run build   # Build for production


---

🤝 Acknowledgments

Laravel

Breeze

Inertia.js

React

Tailwind CSS

Laratrust



---

📄 License

This project is open-source and available under the MIT License.
