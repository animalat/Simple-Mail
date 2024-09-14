import time

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def read_labels(creds):
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
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")