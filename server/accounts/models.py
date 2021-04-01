from django.db import models

from stores.models import Store


class Follow(models.Model):
    follow = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True, related_name='follow',)
    following = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True, related_name='following',)

    class Meta:
        managed = False
        db_table = 'Follow'


class Like(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    store = models.ForeignKey(Store, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Like'


class User(models.Model):
    nickname = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    spoon_cnt = models.IntegerField(blank=True, null=True)
    grade = models.CharField(max_length=100)
    class Meta:
        managed = False
        db_table = 'User'

class Wish(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    store_id = models.IntegerField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'Wish'
