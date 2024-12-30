from rest_framework import serializers
from .models import EmailAddress, Group, Email

class EmailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        # fields automatically generated for us
        model = EmailAddress
        fields = [
                'id', 
                'address'
            ]

class GroupSerializer(serializers.ModelSerializer):
    # nested serializer for EmailAddress
    email_address = EmailAddressSerializer()

    class Meta:
        model = Group
        fields = [
            'id', 
            'name', 
            'group_id', 
            'type', 
            'email_address'
        ]

class EmailSerializer(serializers.ModelSerializer):
    # nested serializer for Group
    groups = GroupSerializer(many=True)

    class Meta:
        model = Email
        fields = [
            'id',
            'message_id',
            'sender',
            'recipient',
            'subject',
            'body',
            'html_content',
            'attachments',
            'inline_images',
            'groups',
            'time_sent',
        ]
