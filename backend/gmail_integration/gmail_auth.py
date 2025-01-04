from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from mailing.models import EmailAddress
import json

SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]

def get_gmail_creds(address):
    try:
        # retrieve stored token
        user = EmailAddress.objects.get(address=address)
        creds = Credentials.from_authorized_user_info(
            json.loads(user.token), SCOPES
        )

        # refresh if expired
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # save updated token
            user.token = creds.to_json()
            user.save()
        return creds
    except Exception:
        # no credentials, user needs to authenticate
        return None
