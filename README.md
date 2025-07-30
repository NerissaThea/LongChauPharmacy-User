# Pharmacy System - Django Project

## 📁 Project Structure

```
PharmacySystem/
├── apps/                 # Django applications
├── static/              # Static files (CSS, JS, Images)
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images and SVG files
├── templates/          # HTML templates
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation Steps

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create Django project:**
   ```bash
   django-admin startproject pharmacy_system .
   ```

5. **Create Django apps:**
   ```bash
   python manage.py startapp accounts
   python manage.py startapp products
   python manage.py startapp orders
   ```

6. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## 📋 Current Files

### Templates
- `index.html` - Homepage
- `login.html` - User login
- `register.html` - User registration
- `cart.html` - Shopping cart
- `checkout.html` - Checkout process
- `i.html` - Simple login form

### Static Files
- **CSS:** `styles.css`, `auth-styles.css`
- **JavaScript:** `script.js`, `auth-script.js`
- **Images:** `logo.svg`, `Welcome Area.svg`

## 🔧 Next Steps

1. Initialize Django project
2. Configure settings.py
3. Create Django apps in `apps/` directory
4. Update template paths in settings
5. Configure static files settings
6. Create models and views
7. Set up URL routing

## 📝 Notes

- All HTML files are organized in `templates/` directory
- Static files are properly organized by type
- Ready for Django development workflow
- Follow Django best practices for project structure