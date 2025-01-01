from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Group, Email
from .serializers import GroupSerializer, EmailSerializer
from gmail_integration.gmail_functions import remove_group_from_email
from gmail_integration.gmail import main

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
        email_address = request.query_params.get('email_address', None)
        group = request.query_params.get('group', None)
        email = request.query_params.get('email', None)

        # make sure params are given
        if not email_address:
            return Response(
                {"error": "email_address query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not group:
            return Response(
                {"error": "group (id) query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not email:
            return Response(
                {"error": "email (id) query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        print(email_address, email, group)
        # try to call function
        try:
            remove_group_from_email(creds=main(), email_address=email_address, group_id=group, email_id=email)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
