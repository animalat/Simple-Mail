from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Group, Email
from .serializers import GroupSerializer, EmailSerializer

class EmailListView(APIView):
    def get(self, request):
        email_address = request.query_params.get('email_address', None)

        if not email_address:
            return Response(
                {"error": "email_address query parameter not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        emails = Email.objects.filter(groups__email_address__address=email_address).distinct()
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
