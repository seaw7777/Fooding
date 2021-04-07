from django.db import models

from accounts.models import User
from stores.models import Store

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    contents = models.CharField(max_length=400)
    write_date = models.DateTimeField(blank=True, null=True)
    store = models.ForeignKey(Store, models.DO_NOTHING, blank=True, null=True)
    star = models.IntegerField(blank=True, null=True)
    image = models.IntegerField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'Review'