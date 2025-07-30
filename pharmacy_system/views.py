from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    """Homepage view"""
    return render(request, 'index.html')

def login_view(request):
    """Login page view"""
    return render(request, 'login.html')

def register_view(request):
    """Register page view"""
    return render(request, 'register.html')

def cart_view(request):
    """Cart page view"""
    return render(request, 'cart.html')

def checkout_view(request):
    """Checkout page view"""
    return render(request, 'checkout.html')

def simple_login_view(request):
    """Simple login form view"""
    return render(request, 'i.html')

def test_checkbox_view(request):
    """Test checkbox functionality"""
    return render(request, 'test_checkbox.html')