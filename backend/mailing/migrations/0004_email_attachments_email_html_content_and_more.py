# Generated by Django 5.1 on 2024-12-28 09:34

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailing', '0003_rename_emails_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='attachments',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), blank=True, default=list, size=None),
        ),
        migrations.AddField(
            model_name='email',
            name='html_content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='email',
            name='inline_images',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), blank=True, default=list, size=None),
        ),
    ]
