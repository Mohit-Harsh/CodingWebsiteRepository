from django.contrib import admin
from django.urls import path
from .views import *
from .recommendations import *

urlpatterns = [
    path("recom/", RecomProblems),
    path("new/", NewProblems),
    path('all/', AllProblems.as_view()),
    path('solved/', SolvedProblemsView.as_view()),
    path('similar/', SimilarProblems.as_view()),
    path('problembyidlist/', ProblemByIdList.as_view()),
    path('topicchart/', TopicChart.as_view()),
    path('companychart/', CompanyChart.as_view()),
    path('problembycompany/', ProblemByCompany.as_view())
]
