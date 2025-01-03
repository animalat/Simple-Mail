from django.urls import path
from .views import GroupView, RemoveGroupView, EmailListView, SendEmailView

urlpatterns = [
    path('emails/', EmailListView.as_view(), name='email-list'),
    path('send-email/', SendEmailView.as_view(), name='send-email'),
    path('groups/', GroupView.as_view(), name='group-list'),
    path('remove-group/', RemoveGroupView.as_view(), name='remove-group'),
]
