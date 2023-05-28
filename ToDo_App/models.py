from django.db import models

# Create your models here.

class Date(models.Model):
    date = models.DateField(unique=True) 

class Task(models.Model):
    title= models.CharField(max_length=70)
    description = models.CharField(max_length=200)
    f_date = models.ForeignKey(Date, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)