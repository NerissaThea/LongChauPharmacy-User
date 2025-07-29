from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Đảm bảo rằng trang chủ sẽ trỏ đến view home
]
