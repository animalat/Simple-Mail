import os
import time
import base64
from datetime import datetime, timezone
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.mime.text import MIMEText

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mailbackend.settings")

from mailing.models import EmailAddress, Group, Email

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

        if not labels:
            print("No labels found.")
            return

        print("Labels:")
        for label in labels:
            group, created = Group.objects.get_or_create(
                group_id=label["id"],
                defaults={
                    "name": label["name"],
                    "type": label["type"],
                    "email_address": email_address
                }
            )
            print(f"Label ID: {label['id']} Created: {created}")
        
        return

    except HttpError as error:
        gmail_error(error)

def read_messages(creds, email_address):
    try:
        service = build("gmail", "v1", credentials=creds)
        results = service.users().messages().list(userId="me", includeSpamTrash=True).execute()
        messages = results.get("messages", [])

        if not messages:
            print("No messages found.")
            return
        
        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            
            # get subject
            subject = ""
            sender = ""
            recipient = ""
            for header in msg["payload"]["headers"]:
                if header["name"] == "Subject":
                    subject = header["value"]
                elif header["name"] == "From":
                    sender = header["value"]
                elif header["name"] == "To":
                    recipient = header["value"]

            # temporarily just get a snippet (will handle whole message & images/attachments later)
            body = msg.get("snippet", "")

            group_ids = []
            for label_id in msg.get("labelIds", []):
                group_ids.append(label_id)

            groups = Group.objects.filter(group_id__in=group_ids, email_address=email_address)

            # get following fields
            html_content = None
            attachments = []
            inline_images = []
            for part in msg['payload'].get('parts', []):
                # attachments
                if part.get('filename'):
                    attachment_id = part['body'].get('attachmentId')
                    if attachment_id:
                        attachment = service.users().messages().attachments().get(
                            userId='me', messageId=msg['id'], id=attachment_id
                        ).execute()
                        file_data = base64.urlsafe_b64decode(attachment['data'].encode('UTF-8'))
                        attachments.append({
                            'filename': part['filename'],
                            'content': base64.b64encode(file_data).decode('UTF-8')
                        })

                headers = {h['name']: h['value'] for h in part.get('headers', [])}
                if 'Content-ID' in headers or 'inline' in headers.get('Content-Disposition', ''):
                    image_data = base64.urlsafe_b64decode(part['body']['data'].encode('UTF-8'))
                    inline_images.append({
                        'content_id': headers.get('Content-ID', '').strip('<>'),
                        'content': base64.b64encode(image_data).decode('UTF-8')
                    })

                if part['mimeType'] == 'text/html':
                    html_content = base64.urlsafe_b64decode(part['body']['data']).decode('UTF-8')

            # get time sent
            epoch_seconds = int(msg['internalDate']) / 1000
            time_sent = datetime.fromtimestamp(epoch_seconds, tz=timezone.utc)

            email, created = Email.objects.get_or_create(
                message_id=message["id"],
                defaults={
                    "sender": sender,
                    "recipient": recipient,
                    "subject": subject,
                    "body": body,
                    "html_content": html_content,
                    "attachments": attachments,
                    "inline_images": inline_images,
                    "time_sent": time_sent
                }
            )

            # check and update fields which changed
            if not created:
                fields_to_update = {}
                if email.sender != sender:
                    fields_to_update["sender"] = sender
                if email.recipient != recipient:
                    fields_to_update["recipient"] = recipient
                if email.subject != subject:
                    fields_to_update["subject"] = subject
                if email.body != body:
                    fields_to_update["body"] = body
                if email.html_content != html_content:
                    fields_to_update["html_content"] = html_content
                if email.attachments != attachments:
                    fields_to_update["attachments"] = attachments
                if email.inline_images != inline_images:
                    fields_to_update["inline_images"] = inline_images
                if email.time_sent != time_sent:
                    fields_to_update["time_sent"] = time_sent

                if fields_to_update:
                    for field, value in fields_to_update.items():
                        setattr(email, field, value)
                    email.save()
            email.groups.add(*groups)

            print(f"Message: {body} Created: {created}")

        return

    except HttpError as error:
        gmail_error(error)

def remove_group_from_email(creds, email_address, email_id, group_id):
    service = build("gmail", "v1", credentials=creds)
    try:
        # remove group from email in Gmail
        service.users().messages().modify(
            userId=email_address,
            id=email_id,
            body={
                'removeLabelIds': [group_id]
            }
        ).execute()

        # remove group from email in db
        Email.objects.get(message_id=email_id).groups.remove(Group.objects.get(group_id=group_id))
    except Exception as e:
        gmail_error(e)

def create_message(sender, to, subject, body):
    message = MIMEText(body)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}

def send_email(creds, sender, to, subject, body):
    service = build("gmail", "v1", credentials=creds)
    try:
        email_message = create_message(sender, to, subject, body)
        result = service.users().messages().send(userId="me", body=email_message).execute()
        return
    except Exception as e:
        print(f"An error occured: {e}")
        return

def gmail_error(error):
    # TODO(developer) - Handle errors from gmail API.
    print(f"An error occurred: {error}")
