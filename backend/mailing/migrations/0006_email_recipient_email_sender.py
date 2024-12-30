# Generated by Django 5.1 on 2024-12-30 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailing', '0005_email_time_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='recipient',
            field=models.CharField(default='unknown@example.com', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='email',
            name='sender',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
