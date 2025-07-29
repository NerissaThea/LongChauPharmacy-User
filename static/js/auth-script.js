// Long Châu Pharmacy Authentication JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Initialize based on current page
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'login':
            initializeLogin();
            break;
        case 'register':
            initializeRegister();
            break;
        default:
            console.log('Unknown auth page');
    }
    
    // Common initialization
    initializePasswordToggle();
    initializeFormValidation();
    initializeAccessibility();
    initializeAnimations();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('login')) return 'login';
    if (path.includes('register')) return 'register';
    return 'unknown';
}

// Login Page Functionality
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Add real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateEmail(emailInput));
            emailInput.addEventListener('input', () => clearValidation(emailInput));
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('blur', () => validatePassword(passwordInput));
            passwordInput.addEventListener('input', () => clearValidation(passwordInput));
        }
    }
}

// Password Toggle Functionality
function initializePasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleButton && passwordInput) {
        toggleButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setLoadingState(submitBtn, true);
    
    // Simulate login API call
    setTimeout(() => {
        setLoadingState(submitBtn, false);
        
        // Mock successful login
        if (email && password) {
            showNotification('Login successful! Redirecting...', 'success');
            
            // Store user session (mock)
            localStorage.setItem('userSession', JSON.stringify({
                email: email,
                loginTime: new Date().toISOString()
            }));
            
            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showNotification('Invalid email or password', 'error');
        }
    }, 2000);
}

function validateLoginForm(email, password) {
    let isValid = true;
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (!validateEmail(emailInput)) {
        isValid = false;
    }
    
    if (!validatePassword(passwordInput)) {
        isValid = false;
    }
    
    return isValid;
}

// Enhanced Email Validation
function validateEmail(input) {
    if (!input) return false;
    
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        setFieldError(input, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        setFieldError(input, 'Please enter a valid email address');
        return false;
    }
    
    setFieldValid(input);
    return true;
}

// Enhanced Password Validation
function validatePassword(input) {
    if (!input) return false;
    
    const password = input.value;
    
    if (!password) {
        setFieldError(input, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        setFieldError(input, 'Password must be at least 6 characters');
        return false;
    }
    
    setFieldValid(input);
    return true;
}

// Field State Management
function setFieldError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
}

function setFieldValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

function clearValidation(input) {
    input.classList.remove('is-valid', 'is-invalid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

// Register Page Functionality
function initializeRegister() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Add real-time validation
        const inputs = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            password: document.getElementById('password'),
            agreeTerms: document.getElementById('agreeTerms')
        };
        
        // Add event listeners for validation
        Object.entries(inputs).forEach(([key, input]) => {
            if (input) {
                input.addEventListener('blur', (e) => validateField(key, e.target.value));
                input.addEventListener('input', clearValidation);
            }
        });
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        agreeTerms: document.getElementById('agreeTerms').checked
    };
    
    // Validate form
    if (!validateRegisterForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setLoadingState(submitBtn, true);
    
    // Simulate register API call
    setTimeout(() => {
        setLoadingState(submitBtn, false);
        
        // Mock successful registration
        showNotification('Account created successfully! Please log in.', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 2500);
}

function validateRegisterForm(data) {
    let isValid = true;
    
    // Validate each field
    Object.entries(data).forEach(([key, value]) => {
        if (!validateField(key, value)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Field Validation Functions
function validateField(fieldName, value) {
    const input = document.getElementById(fieldName);
    if (!input) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'firstName':
        case 'lastName':
            if (!value || value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            if (!validateEmailFormat(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (!validatePhoneFormat(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'password':
            if (!validatePasswordStrength(value)) {
                isValid = false;
                errorMessage = 'Password must be at least 6 characters';
            }
            break;
            
        case 'agreeTerms':
            if (!value) {
                isValid = false;
                errorMessage = 'You must agree to the terms and conditions';
            }
            break;
    }
    
    // Update UI
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        removeErrorMessage(input);
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        showErrorMessage(input, errorMessage);
    }
    
    return isValid;
}

function validateEmail(event, emailValue = null) {
    const email = emailValue || (event && event.target ? event.target.value : '');
    const emailInput = document.getElementById('email');
    if (!emailInput) return true;
    
    const isValid = validateEmailFormat(email);
    
    if (isValid) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        removeErrorMessage(emailInput);
    } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        showErrorMessage(emailInput, 'Please enter a valid email address');
    }
    
    return isValid;
}

function validatePassword(event, passwordValue = null) {
    const password = passwordValue || (event && event.target ? event.target.value : '');
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return true;
    
    const isValid = validatePasswordStrength(password);
    
    if (isValid) {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
        removeErrorMessage(passwordInput);
    } else {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        showErrorMessage(passwordInput, 'Password must be at least 6 characters');
    }
    
    return isValid;
}

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneFormat(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validatePasswordStrength(password) {
    return password && password.length >= 6;
}

function clearValidation(event) {
    const input = event.target;
    input.classList.remove('is-invalid', 'is-valid');
    removeErrorMessage(input);
}

// UI Helper Functions
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Please wait...';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

function showErrorMessage(input, message) {
    removeErrorMessage(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(input) {
    const existingError = input.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
    notification.innerHTML = `
        <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-triangle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Form Validation Enhancement
function initializeFormValidation() {
    // Add Bootstrap validation classes
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.classList.add('needs-validation');
        form.noValidate = true;
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Add ARIA labels
    const inputs = document.querySelectorAll('.auth-input');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', input.placeholder || input.name || 'Input field');
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.type !== 'submit') {
            const form = e.target.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
                const currentIndex = inputs.indexOf(e.target);
                const nextInput = inputs[currentIndex + 1];
                
                if (nextInput) {
                    nextInput.focus();
                } else {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.click();
                    }
                }
            }
        }
    });
}

// Animation Effects
function initializeAnimations() {
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe form elements
    const animatedElements = document.querySelectorAll('.auth-form-content > *');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Password Visibility Toggle
function initializePasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'btn btn-link position-absolute end-0 top-50 translate-middle-y';
        toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
        toggleBtn.style.cssText = 'border: none; background: none; color: rgba(255,255,255,0.7); z-index: 10;';
        
        // Wrap input in relative container
        const wrapper = document.createElement('div');
        wrapper.className = 'position-relative';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
        });
    });
}

// Initialize password toggle on load
document.addEventListener('DOMContentLoaded', initializePasswordToggle);

// Session Management
function checkExistingSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        try {
            const userData = JSON.parse(session);
            const loginTime = new Date(userData.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            // Session expires after 24 hours
            if (hoursDiff < 24) {
                showNotification('You are already logged in. Redirecting...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                return true;
            } else {
                localStorage.removeItem('userSession');
            }
        } catch (e) {
            localStorage.removeItem('userSession');
        }
    }
    return false;
}

// Check session on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only check session on login/register pages
    const currentPage = getCurrentPage();
    if (currentPage === 'login' || currentPage === 'register') {
        checkExistingSession();
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmailFormat,
        validatePhoneFormat,
        validatePasswordStrength,
        handleLogin,
        handleRegister,
        showNotification
    };
}