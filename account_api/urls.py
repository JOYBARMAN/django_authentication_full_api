from django.urls import path
from .views import UserRegistrationView,UserLoginView,UserProfileView
urlpatterns = [
    path('register/',UserRegistrationView.as_view()),
    path('login/',UserLoginView.as_view()),
    path('profile/',UserProfileView.as_view()),
]
