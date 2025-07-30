from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import logging
from .forms import CustomUserRegistrationForm, CustomLoginForm, ProfileEditForm
from .models import CustomUser

logger = logging.getLogger(__name__)

@csrf_exempt
def register_view(request):
    """
    Handle user registration
    """
    if request.method == 'POST':
        logger.info('Registration attempt started')
        try:
            # Parse JSON data from AJAX request
            data = json.loads(request.body)
            logger.info(f'Received registration data: {data}')
            
            # Create form with data
            form_data = {
                'first_name': data.get('firstName'),
                'last_name': data.get('lastName'),
                'email': data.get('email'),
                'phone': data.get('phone'),
                'password1': data.get('password'),
                'password2': data.get('confirmPassword'),
                'newsletter_subscription': data.get('newsletter', False),
                'agree_terms': data.get('agreeTerms', False)
            }
            logger.info(f'Form data prepared: {form_data}')
            
            form = CustomUserRegistrationForm(form_data)
            logger.info(f'Form created, validating...')
            
            if form.is_valid():
                logger.info('Form is valid, saving user...')
                user = form.save()
                logger.info(f'User created: {user.email}')
                # Auto login after registration
                login(request, user)
                logger.info('User logged in successfully')
                return JsonResponse({
                    'success': True,
                    'message': 'Registration successful! Welcome to Long Châu Pharmacy.',
                    'redirect_url': '/'
                })
            else:
                logger.error(f'Form validation failed: {form.errors}')
                return JsonResponse({
                    'success': False,
                    'message': 'Validation failed',
                    'errors': form.errors
                })
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Invalid data format'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Registration failed: {str(e)}'
            })
    
    # GET request - show registration form
    form = CustomUserRegistrationForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    """
    Handle user login
    """
    if request.method == 'POST':
        try:
            # Parse JSON data from AJAX request
            data = json.loads(request.body)
            
            email = data.get('email')
            password = data.get('password')
            remember_me = data.get('rememberMe', False)
            
            # Authenticate user
            user = authenticate(request, username=email, password=password)
            
            if user is not None:
                login(request, user)
                
                # Set session expiry based on remember me
                if not remember_me:
                    request.session.set_expiry(0)  # Session expires when browser closes
                else:
                    request.session.set_expiry(1209600)  # 2 weeks
                
                return JsonResponse({
                    'success': True,
                    'message': f'Welcome back, {user.get_full_name()}!',
                    'redirect_url': '/'
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Invalid email or password. Please try again.'
                })
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Invalid data format'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Login failed: {str(e)}'
            })
    
    # GET request - show login form
    form = CustomLoginForm()
    return render(request, 'login.html', {'form': form})

@login_required
def logout_view(request):
    """
    Handle user logout with AJAX support
    """
    if request.method == 'POST':
        # AJAX logout request
        logout(request)
        return JsonResponse({
            'success': True,
            'message': 'You have been successfully logged out.',
            'redirect_url': '/'
        })
    else:
        # Regular GET request logout
        logout(request)
        messages.success(request, 'You have been successfully logged out.')
        return redirect('home')

@login_required
def profile_view(request):
    """
    User profile view with edit functionality
    """
    if request.method == 'POST':
        form = ProfileEditForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:profile')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = ProfileEditForm(instance=request.user)
    
    return render(request, 'accounts/profile.html', {
        'user': request.user,
        'form': form
    })

def check_email_exists(request):
    """
    AJAX endpoint to check if email already exists
    """
    if request.method == 'GET':
        email = request.GET.get('email')
        exists = CustomUser.objects.filter(email=email).exists()
        return JsonResponse({'exists': exists})
    
    return JsonResponse({'error': 'Invalid request method'})
