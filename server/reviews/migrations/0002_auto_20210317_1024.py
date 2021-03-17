# Generated by Django 3.1.1 on 2021-03-17 01:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210317_1024'),
        ('stores', '0002_auto_20210317_1024'),
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='store_id',
            field=models.ForeignKey(db_column='store_id', on_delete=django.db.models.deletion.CASCADE, to='stores.store'),
        ),
        migrations.AlterField(
            model_name='review',
            name='user_id',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='accounts.user'),
        ),
    ]
