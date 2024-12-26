from django.urls import path
from .views import EmailListView

urlpatterns = [
    path('emails/', EmailListView.as_view(), name='email-list'),
]