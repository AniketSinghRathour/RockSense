# Generated by Django 5.1.2 on 2024-10-29 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('identify', '0003_identify_delete_info'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='identify',
            name='user',
        ),
    ]
