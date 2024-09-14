from django.db import models

# Create your models here.
class EmailAddress(models.Model):
    address = models.EmailField(unique=True)

    def __str__(self):
        return self.address

class Group(models.Model):
    name = models.CharField(max_length=255)
    gmail_id = models.CharField(max_length=255, unique=True)  # Store the Gmail label ID
    type = models.CharField(max_length=50)  # Store the type of the label
    email_address = models.ForeignKey(EmailAddress, on_delete=models.CASCADE, related_name='groups')

    def __str__(self):
        return self.name
    
class Emails(models.Model):
    subject = models.CharField(max_length=255)
    body = models.TextField()
    groups = models.ManyToManyField(Group, related_name='emails')

    def __str__(self):
        return self.subject