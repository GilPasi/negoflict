# Generated by Django 4.1.7 on 2023-05-13 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0010_alter_message_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupmember',
            name='is_active',
            field=models.BooleanField(default=True, null=True),
        ),
    ]