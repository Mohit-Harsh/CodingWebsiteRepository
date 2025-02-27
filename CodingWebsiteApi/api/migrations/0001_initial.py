# Generated by Django 4.2.7 on 2023-12-16 16:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ApiProblems",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("title", models.TextField()),
                ("description", models.TextField()),
                ("is_premium", models.BooleanField()),
                ("difficulty", models.CharField()),
                (
                    "acceptance_rate",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[django.core.validators.MaxValueValidator(100.0)],
                    ),
                ),
                (
                    "frequency",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[django.core.validators.MaxValueValidator(100.0)],
                    ),
                ),
                ("url", models.TextField()),
                ("discuss_count", models.IntegerField()),
                ("accepted", models.CharField()),
                ("submissions", models.CharField()),
                ("companies", models.TextField()),
                ("related_topics", models.TextField()),
                ("likes", models.IntegerField()),
                ("dislikes", models.IntegerField()),
                ("rating", models.IntegerField()),
                ("asked_by_faang", models.BooleanField()),
            ],
        ),
    ]
