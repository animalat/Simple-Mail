# Generated by Django 5.1 on 2025-01-04 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailing', '0006_email_recipient_email_sender'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailaddress',
            name='token',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
