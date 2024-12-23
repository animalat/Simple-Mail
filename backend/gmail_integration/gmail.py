import os
import sys

# Ensure project root is in Python path
current_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(current_dir, '..'))
if project_root not in sys.path:
    sys.path.append(project_root)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mailbackend.settings')
import django
django.setup()

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

from mailing.models import EmailAddress, Group, Emails
from gmail_integration.gmail_functions import get_user_email_address, read_labels, read_messages

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

current_dir = os.path.dirname(__file__)
credentials_path = os.path.join(current_dir, "credentials.json")
token_path = os.path.join(current_dir, "token.json")

def main():
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

  email_address_instance = get_user_email_address(creds)
  print(email_address_instance)
  groups = read_labels(creds, email_address_instance)
  messages = read_messages(creds, email_address_instance)

if __name__ == "__main__":
  main()