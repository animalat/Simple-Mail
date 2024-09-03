import os

import time
import threading

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

current_dir = os.path.dirname(__file__)
credentials_path = os.path.join(current_dir, "credentials.json")
token_path = os.path.join(current_dir, "token.json")

def main():
  """Shows basic usage of the Gmail API.
  Lists the user's Gmail labels.
  """
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists(token_path):
    creds = Credentials.from_authorized_user_file(token_path, SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          credentials_path, SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open(token_path, "w") as token:
      token.write(creds.to_json())

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
      # msg = service.users().messages().get(userId="me", id=message["id"]).execute()
      # print(msg["snippet"])
      # print("\n")
      # time.sleep(2)

  except HttpError as error:
    # TODO(developer) - Handle errors from gmail API.
    print(f"An error occurred: {error}")

if __name__ == "__main__":
  main()