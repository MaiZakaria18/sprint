SprintMaster
SprintMaster is a project management application designed to streamline task and project management for teams of all sizes. This application provides features for managing projects, tasks, and user roles, with an emphasis on simplicity and efficiency.

Features
Project Management: Create, update, and delete projects. View a list of all projects.
Task Management: Manage tasks within each project, including creating, updating, and deleting tasks. Task details are accessible with a detailed view for each task.
User Management: Register new users, update user information, and handle user authentication with JWT (JSON Web Token). Supports role-based access control (Junior, Manager, Senior, Super Admin).
Authentication: Secure login and logout functionality using JWT for managing sessions.
Notifications: Built-in notification system for task assignments and updates.
Responsive UI: User-friendly interface built with React.
-Technologies Used
    Backend: Django, Django REST Framework
    Frontend: React.js
    Database: SQLite
    Authentication: JWT (via rest_framework_simplejwt)
    Styling: CSS
    Installation
    Prerequisites
    Python 3.x
    Node.js & npm
    Django 3.x or higher
    React.js
    Django REST Framework

-Backend Setup
    1-Clone the repository:

    git clone https://github.com/your-username/sprint.git
    cd sprintmaster

    2-Create a virtual environment and activate it:
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    3-Install the required dependencies:
    pip install -r requirements.txt

    4-Apply migrations:
    python manage.py migrate

    5-Create a superuser:
    python manage.py createsuperuser

    6-Run the development server:
    python manage.py runserver


-Frontend Setup

    1-Navigate to the frontend directory:
    cd frontend

    2-Install the dependencies:
    npm install

    3-Start the React development server:
    npm start

-Usage
URL Configuration
The SprintMaster application routes various functionalities through the following URLs:

-Admin Panel: http://localhost:8000/admin/
-Projects:
        List/Create: http://localhost:8000/projects/
        Details/Update/Delete: http://localhost:8000/projects/<int:project_id>/

-Tasks:
       List: http://localhost:8000/projects/<int:project_id>/tasklist/
       Create: http://localhost:8000/projects/<int:project_id>/tasks/create/
       Update/Delete/Detail: http://localhost:8000/projects/<int:project_id>/tasks/<int:pk>/

-Users:
       Register: http://localhost:8000/users/register/
       Update: http://localhost:8000/users/update/
       Logout: http://localhost:8000/users/logout/
       Autocomplete: http://localhost:8000/users/autocomplete/

-Authentication:
       Login: http://localhost:8000/login/
       Token Refresh: http://localhost:8000/login/refresh/

Contributing
Contributions are welcome! Please fork the repository and create a pull request to propose changes.

