from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def read_labels(creds):
    try:
        # Call the Gmail API
        service = build("gmail", "v1", credentials=creds)
        results = service.users().labels().list(userId="me").execute()
        labels = results.get("labels", [])

        # results = service.users().messages().list(userId="me", labelIds=['INBOX']).execute()
        # messages = results.get("messages", [])

        if not labels:
        # message_count = int(input("How many messages do you want to see? "))
        # if not messages:
            print("No labels found.")
            return

        print("Labels:")
        for label in labels:
            print(label["name"])

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")