# Generated by Django 4.1.4 on 2022-12-25 20:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('negoflict_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='user',
        ),
    ]