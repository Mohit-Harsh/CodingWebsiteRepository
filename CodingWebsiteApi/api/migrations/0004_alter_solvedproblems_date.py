# Generated by Django 4.2.7 on 2023-12-17 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_solvedproblems_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="solvedproblems", name="date", field=models.DateField(),
        ),
    ]