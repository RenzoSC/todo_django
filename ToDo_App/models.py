from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=200)
    f_date = models.DateField()  # Cambiar a DateField
    done = models.BooleanField(default=False)