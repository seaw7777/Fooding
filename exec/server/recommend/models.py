from django.db import models
from reviews.models import Review
from accounts.models import User
from stores.models import Store

# Create your models here.
class reviewcategory(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    krzzimandtang = models.IntegerField(blank=True, null=True)
    krbbq = models.IntegerField(blank=True, null=True)
    krgukbap = models.IntegerField(blank=True, null=True)
    krstewandcasserole = models.IntegerField(blank=True, null=True)
    krporkfeetandBossam = models.IntegerField(blank=True, null=True)
    krseafood = models.IntegerField(blank=True, null=True)
    krnoodles = models.IntegerField(blank=True, null=True)
    krhomecooking = models.IntegerField(blank=True, null=True)
    krchicken = models.IntegerField(blank=True, null=True)
    krfood = models.IntegerField(blank=True, null=True)
    bunsick = models.IntegerField(blank=True, null=True)
    jpfriedfood = models.IntegerField(blank=True, null=True)
    jpsashimi = models.IntegerField(blank=True, null=True)
    jphomecooking = models.IntegerField(blank=True, null=True)
    jpseafood = models.IntegerField(blank=True, null=True)
    jpnoodles = models.IntegerField(blank=True, null=True)
    jpfood = models.IntegerField(blank=True, null=True)
    cddrink = models.IntegerField(blank=True, null=True)
    cdcafe = models.IntegerField(blank=True, null=True)
    cddessert = models.IntegerField(blank=True, null=True)
    chnoodles = models.IntegerField(blank=True, null=True)
    chfriedfood = models.IntegerField(blank=True, null=True)
    chbbq = models.IntegerField(blank=True, null=True)
    chfood = models.IntegerField(blank=True, null=True)
    wenoodles = models.IntegerField(blank=True, null=True)
    wepizza = models.IntegerField(blank=True, null=True)
    wesalad = models.IntegerField(blank=True, null=True)
    wefood = models.IntegerField(blank=True, null=True)
    brbar = models.IntegerField(blank=True, null=True)
    brjpanbar = models.IntegerField(blank=True, null=True)
    bkbakery = models.IntegerField(blank=True, null=True)
    fffood = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reviewcategory'