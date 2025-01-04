from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class EmailAddress(models.Model):
    address = models.EmailField(unique=True)
    token = models.TextField()

    def __str__(self):
        return self.address

class Group(models.Model):
    name = models.CharField(max_length=255)
    group_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)
    email_address = models.ForeignKey(EmailAddress, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
    
class Email(models.Model):
    message_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    sender = models.CharField(max_length=255, null=True, blank=True)
    subject = models.CharField(max_length=255)
    recipient = models.CharField(max_length=255)
    body = models.TextField()
    html_content = models.TextField(null=True, blank=True)
    attachments = ArrayField(models.JSONField(), default=list, blank=True)
    inline_images = ArrayField(models.JSONField(), default=list, blank=True)
    time_sent = models.DateTimeField(null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name='emails')

    def sanitizeHTML(self):
        # TODO: Sanitize HTML
        return

    def save(self, *args, **kwargs):
        if self.html_content:
            self.sanitizeHTML()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.subject
    