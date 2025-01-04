from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google_auth_oauthlib.flow import Flow
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect
from .models import Group, Email
from .serializers import GroupSerializer, EmailSerializer
from gmail_integration.gmail_functions import get_user_email_address, send_email, remove_group_from_email
from gmail_integration.gmail_auth import get_gmail_creds

SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]
CONFIG_PATH = "../gmail_integration/credentials.json"

class GenerateAuthURL():
    def get(self, request):
        try:
            email_address = request.query_params.get('email_address', None)
            creds = get_gmail_creds(email_address)
            if creds:
                return Response(
                    {"message": "Already authenticated", "authenticated": True}
                )
            
            flow = Flow.from_client_secrets_file(
                CONFIG_PATH,
                scopes=SCOPES,
                redirect_uri=request.build_absolute_uri(reverse('oauth2callback'))
            )
            auth_url, _ = flow.authorization_url(prompt='consent')

            return Response({"auth_url": auth_url, "authenticated": False})
        except Exception as e:
            return Response(
                {"error": str(e), "authenticated": False}
            )

class OAuth2Callback():
    def get(self, request):
        try:
            flow = Flow.from_client_secrets_file(
                CONFIG_PATH,
                scopes=SCOPES,
                redirect_uri=request.build_absolute_uri(reverse('oauth2callback'))
            )
            flow.fetch_token(authorization_response=request.build_absolute_uri())

            creds = flow.credentials
            get_user_email_address(creds)           # also saves email address
            return Response(
                {"message": "Successfully authenticated", "authenticated": True}
            )
        except Exception as e:
            return Response(
                {"error": str(e), "authenticated": False}
            )
        
class EmailListView(APIView):
    def get(self, request):
        email_address = request.query_params.get('email_address', None)
        group = request.query_params.get('group', None)

        if not email_address:
            return Response(
                {"error": "email_address query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not group:
            return Response(
                {"error": "group (id) query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

        emails = Email.objects.filter(groups__email_address__address=email_address, groups__group_id=group).distinct()
        serializer = EmailSerializer(emails, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SendEmailView(APIView):
    def post(self, request):
        email_address = request.data.get('email_address')
        recipient = request.data.get('recipient')
        subject = request.data.get('subject')
        body = request.data.get('body')
        attachment = request.FILES.get('attachment, None')
        
        if not email_address:
            return Response(
                {"error": "Sender email address not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not recipient:
            return Response(
                {"error": "Recipient email address not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not subject:
            return Response(
                {"error": "Email subject not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not body:
            return Response(
                {"error": "Email body not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            creds = get_gmail_creds(email_address)

            send_email(
                creds=creds,
                sender=email_address,
                to=recipient,
                subject=subject,
                body=body,
                attachment=attachment
            )
            return Response(
                {"message": "Email successfully sent"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GroupView(APIView):
    def get(self, request):
        email_address = request.query_params.get('email_address', None)

        if not email_address:
            return Response(
                {"error": "email_address query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        groups = Group.objects.filter(email_address__address=email_address).distinct()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class RemoveGroupView(APIView):
    def post(self, request):
        email_address = request.data.get('email_address')
        group = request.data.get('group')
        email = request.data.get('email')

        # make sure params are given
        if not email_address:
            return Response(
                {"error": "email_address not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not group:
            return Response(
                {"error": "group (id) not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not email:
            return Response(
                {"error": "email (id) not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # try to call function
        try:
            remove_group_from_email(creds=get_gmail_creds(email_address), email_address=email_address, group_id=group, email_id=email)
            return Response(
                {"message": "Group removed successfully"}, 
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )