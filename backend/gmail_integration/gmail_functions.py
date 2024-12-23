import os
import time

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mailbackend.settings")

from mailing.models import EmailAddress, Group, Emails

def get_user_email_address(creds):
    try:
        # Build the Gmail service
        service = build("gmail", "v1", credentials=creds)
        
        # Get the user's profile information
        profile = service.users().getProfile(userId="me").execute()
        email_address = profile.get("emailAddress")

        email_address_instance, created = EmailAddress.objects.get_or_create(address=email_address)
        if created:
            print(f"Email address {email_address} saved to the database.")
        else:
            print(f"Email address {email_address} already exists in the database.")
        
        return email_address_instance

    except HttpError as error:
        gmail_error(error)

def read_labels(creds, email_address):
    try:
        # Call the Gmail API
        service = build("gmail", "v1", credentials=creds)

        results = service.users().labels().list(userId="me").execute()
        labels = results.get("labels", [])

        groups = []

        if not labels:
            print("No labels found.")
        else:
            print("Labels:")
            for label in labels:
                group = Group.objects.create(
                    gmail_id=label["id"],
                    defaults={
                        "name": label["name"],
                        "type": label["type"],
                        "email_address": email_address
                    }
                )
                groups.append(group)
                print(f"Label ID: {label['id']}")
        
        return groups

    except HttpError as error:
        gmail_error(error)

def read_messages(creds, email_address):
    try:
        service = build("gmail", "v1", credentials=creds)
        results = service.users().messages().list(userId="me", labelIds=['INBOX']).execute()
        messages = results.get("messages", [])

        if not messages:
            print("No messages found.")
            return

        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            # get subject from msg
            subject = next((header["value"] for header in msg["payload"]["headers"] if header["name"] == "Subject"), "No Subject")
            body = msg.get("snippet", "No Body")
            
            email = Emails.objects.create(subject=subject, body=body)
            email.groups.add(*Group.objects.filter(email_address=email_address))
            print(f"Saved email: {subject}")

    except HttpError as error:
        gmail_error(error)

def gmail_error(error):
    # TODO(developer) - Handle errors from gmail API.
    print(f"An error occurred: {error}")