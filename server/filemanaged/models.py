from django.db import models

# Create your models here.
class File(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    body = models.TextField()
    images = models.ImageField(blank=True, upload_to="images", null=True)
        
    class Meta:
        managed = False
        db_table = 'file'