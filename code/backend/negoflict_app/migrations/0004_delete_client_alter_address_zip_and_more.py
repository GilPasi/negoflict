# Generated by Django 4.1.7 on 2023-03-03 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('negoflict_app', '0003_alter_mediator_options'),
    ]

    operations = [
        migrations.DeleteModel(
            name='client',
        ),
        migrations.AlterField(
            model_name='address',
            name='zip',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='address',
            unique_together={('city', 'street')},
        ),
    ]
