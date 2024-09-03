from django.db import models

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Email(models.Model):
    address = models.EmailField(unique=True)
    groups = models.ManyToManyField(Group, related_name='emails')

    def __str__(self):
        return self.address