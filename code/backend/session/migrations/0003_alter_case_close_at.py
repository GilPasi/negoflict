# Generated by Django 4.1.7 on 2023-03-15 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0002_case_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='close_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]