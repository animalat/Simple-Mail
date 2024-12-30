from django.urls import path
from .views import GroupView, EmailListView

urlpatterns = [
    path('emails/', EmailListView.as_view(), name='email-list'),
    path('groups/', GroupView.as_view(), name='group-list'),
]
