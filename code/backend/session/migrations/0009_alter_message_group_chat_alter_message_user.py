# Generated by Django 4.1.7 on 2023-05-13 10:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0008_alter_message_group_chat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='group_chat',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='session.groupchat'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='user',
            field=models.ForeignKey(blank=True, default='Mediator', null=True, on_delete=django.db.models.deletion.PROTECT, to='session.groupmember'),
        ),
    ]
