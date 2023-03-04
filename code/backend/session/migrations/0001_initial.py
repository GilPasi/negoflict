# Generated by Django 4.1.7 on 2023-03-03 19:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('negoflict_app', '0004_delete_client_alter_address_zip_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=150)),
                ('category', models.CharField(choices=[('FA', 'Family'), ('FR', 'Friends'), ('NE', 'Neighbors'), ('ED', 'Education'), ('OR', 'Organizations'), ('BS', 'Buisiness'), ('PO', 'Politics'), ('OT', 'Other')], default='OT', max_length=2)),
                ('sub_category', models.CharField(max_length=50)),
                ('problem_brief', models.CharField(max_length=150, null=True)),
                ('close_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('summary', models.TextField(null=True)),
                ('mediator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='negoflict_app.mediator')),
            ],
        ),
        migrations.CreateModel(
            name='GroupChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cteate_at', models.DateTimeField(auto_now=True)),
                ('chat', models.CharField(choices=[('A', 'Chat only with side A'), ('B', 'Chat only with side B'), ('G', 'Chat with the group')], default='G', max_length=1)),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.case')),
            ],
        ),
        migrations.CreateModel(
            name='GroupMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('side', models.CharField(choices=[('A', 'Side A'), ('B', 'Side B'), ('N', 'Null')], default='N', max_length=1)),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.case')),
                ('group_chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.groupchat')),
                ('mediator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='negoflict_app.mediator')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(max_length=180, null=True)),
                ('case_rate', models.CharField(choices=[('GS', 'GREAT_SUCCESS'), ('S', 'SUCCESS'), ('PS', 'PARTIAL_SUCCESS'), ('WS', 'WITHOUT_SUCCESS'), ('F', 'FAILURE')], default='', max_length=2, null=True)),
                ('case', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='session.case')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('date_time', models.DateTimeField(auto_now_add=True, null=True)),
                ('time_left_last_message', models.DecimalField(decimal_places=2, max_digits=10)),
                ('num_of_chars', models.IntegerField()),
                ('text', models.TextField()),
                ('group_chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.groupchat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.groupmember')),
            ],
        ),
    ]
