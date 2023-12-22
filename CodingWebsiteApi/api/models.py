import datetime
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from users.models import User
from django.utils import timezone
class ApiProblems(models.Model):

    id = models.BigAutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    is_premium = models.BooleanField()
    difficulty = models.CharField()
    acceptance_rate = models.DecimalField(max_digits=5, decimal_places=2, validators=[MaxValueValidator(100.00)])
    frequency = models.DecimalField(max_digits=5, decimal_places=2, validators=[MaxValueValidator(100.00)])
    url = models.TextField()
    discuss_count = models.IntegerField()
    accepted = models.CharField()
    submissions = models.CharField()
    companies = models.TextField()
    related_topics = models.TextField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    rating = models.IntegerField()
    asked_by_faang = models.BooleanField()

    def __str__(self):

        return self.title


class SolvedProblems(models.Model):

    id = models.BigAutoField(primary_key=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    problemid = models.ForeignKey(ApiProblems, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.DurationField()
    accuracy = models.DecimalField(max_digits=5,decimal_places=2, validators=[MaxValueValidator(100.00)])


