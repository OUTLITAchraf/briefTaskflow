# TaskFlow 🚀  

TaskFlow is a **full-stack application** designed to help teams organize and track their daily tasks efficiently.  
This platform provides a clear, intuitive interface for managing tasks, users, and team collaboration.  

---

## Features ✨  

### Admin Role 👑  
- **User Management**: Admins can create, update, and delete users.  
- **Task Oversight**: Admins can manage all tasks, including creating new ones and editing existing ones.  
- **Task Assignment**: Admins have the ability to assign tasks to any user.  
- **Dashboard View**: A comprehensive dashboard provides an overview of all tasks and users, offering a clear picture of team workload and progress.  

### User Role 👤  
- **Personal Task Management**: Users can create and manage their own tasks.  
- **Task Assignment**: Users can assign tasks they create to other users.  
- **Personal Dashboard**: A personalized dashboard displays tasks they've created and tasks that have been assigned to them, ensuring they stay on top of their responsibilities.  

---

## Tech Stack 🛠️  

### Backend  
- **Laravel**: A powerful PHP framework that provides the backend logic, API routes, and database management.  
- **Laratrust**: A package for handling user roles and permissions, ensuring secure and restricted access to different features for admins and regular users.  
- **Sanctum**: Used for API authentication, providing a simple yet effective way to secure the application.  

### Frontend  
- **React**: A popular JavaScript library for building dynamic and interactive user interfaces.  
- **Inertia.js**: A "monolith" framework that bridges the gap between the Laravel backend and the React frontend, allowing you to build a single-page application (SPA) without the complexity of a traditional API.  
- **Tailwind CSS**: A utility-first CSS framework used for styling the application, making it easy to create a custom and responsive design.  

### Other Tools  
- **Vite**: A fast build tool that significantly improves the development experience by providing instant server start and lightning-fast hot module replacement.  
- **Lucide React & Heroicons**: Icon libraries that add visual flair and clarity to the UI.  
- **SweetAlert2 & React Hot Toast**: Libraries for creating beautiful, responsive alerts and notifications to provide user feedback.  

---

## Project Structure 📂  

The project follows the standard Laravel directory structure with the frontend assets organized for React and Inertia.js.  

### Backend (Laravel) Structure  
- `app/`: Contains the core code of your application.  
  - `Http/`: Holds controllers, middleware, and request classes.  
    - `Controllers/`:  
      - `Admin/`: Controllers specific to admin functionalities (e.g., `UserController.php`, `DashboardController.php`).  
      - `User/`: Controllers for regular user actions (e.g., `TaskController.php`).  
      - `Auth/`: Authentication controllers.  
  - `Models/`: Eloquent models that interact with your database tables (e.g., `User.php`, `Task.php`).  
  - `Providers/`: Service providers for bootstrapping the application.  

- `routes/`: Defines all the application's routes.  
  - `web.php`: Routes for web-based requests, handled by Inertia.js.  

- `database/`: Contains migrations, seeders, and model factories.  
  - `migrations/`: Schema for your database tables.  
  - `seeders/`: Data to populate your database (e.g., `UserSeeder.php`, `RoleSeeder.php`).  

- `config/`: Configuration files for the application.  

### Frontend (React & Inertia) Structure  
- `resources/js/`: The main directory for all JavaScript and React components.  
  - `Components/`: Reusable React components used throughout the application.  
    - `UI/`: Generic UI components (e.g., `Button.jsx`, `Modal.jsx`).  
    - `Forms/`: Components related to form inputs.  
    - `Layouts/`: Layout components (e.g., `AuthenticatedLayout.jsx`).  
  - `Pages/`: Inertia pages that are rendered by the Laravel controllers.  
    - `Admin/`:  
      - `Dashboard.jsx`: The admin dashboard page.  
      - `Users/`: Pages for user management (e.g., `Index.jsx`, `Create.jsx`).  
      - `Tasks/`: Pages for admin task management.  
    - `User/`:  
      - `Dashboard.jsx`: The regular user dashboard page.  
      - `Tasks/`: Pages for user task management.  
    - `Auth/`: Authentication pages.  
  - `app.jsx`: The main entry point for the Inertia application.  

- `resources/css/`: Contains the main stylesheet for Tailwind CSS.  

---

## Installation and Setup 🚀  

### Prerequisites  
- PHP >= 8.1  
- Composer  
- Node.js & npm  

### Steps  

1. **Clone the repository**:  
```bash
git clone https://github.com/your_username/TaskFlow.git
cd TaskFlow

2. Install PHP dependencies:



composer install

3. Install JavaScript dependencies:



npm install

4. Set up the environment:



cp .env.example .env
php artisan key:generate

Configure your database connection in the .env file.


5. Run database migrations and seed the database:



php artisan migrate --seed

This will create the necessary database tables and populate them with initial data, including a default admin user.

6. Start the development server:
Run both the Laravel and Vite development servers in separate terminals:



# Terminal 1
php artisan serve

# Terminal 2
npm run dev

7. Access the application:
Open your browser and go to:



http://127.0.0.1:8000


---

Contributing 🤝

Contributions are welcome! If you have suggestions or find a bug, please feel free to open an issue or submit a pull request.

1. Fork the repository.


2. Create a new branch:

git checkout -b feature/your-feature-name


3. Commit your changes:

git commit -m 'Add new feature'


4. Push to the branch:

git push origin feature/your-feature-name


5. Open a Pull Request.




---

License 📜

This project is open-source and licensed under the MIT License.

