from django.contrib import admin
from .models import ApiProblems, SolvedProblems
# Register your models here.
admin.site.register(ApiProblems)
admin.site.register(SolvedProblems)