from django.db import models


class Symptom(models.Model):
    feature = models.CharField(max_length=50)


class Diagnosis(models.Model):
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    frequency = models.IntegerField()
