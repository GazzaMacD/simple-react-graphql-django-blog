# Generated by Django 2.2 on 2021-04-05 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BasePartner',
            new_name='Partner',
        ),
    ]