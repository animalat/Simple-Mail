import time

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

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
                group, created = Group.objects.get_or_create(
                    gmail_id=label["id"],
                    defaults={
                        "name": label["name"],
                        "type": label["type"],
                        "email_address": email_address
                    }
                )
                groups.append(group)
                print(f"Label ID: {label['id']}, Group Created: {created}")
        
        return groups

    except HttpError as error:
        gmail_error(error)

def read_messages(creds):
    try:
        # Call the Gmail API
        service = build("gmail", "v1", credentials=creds)

        results = service.users().messages().list(userId="me", labelIds=['INBOX']).execute()
        messages = results.get("messages", [])

        message_count = int(input("How many messages do you want to see? "))
        if not messages:
            print("No messages found.")
            return

        print("Labels:")
        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            print(msg["snippet"])
            print("\n")
            time.sleep(2)

    except HttpError as error:
        gmail_error(error)

def gmail_error(error):
    # TODO(developer) - Handle errors from gmail API.
    print(f"An error occurred: {error}")