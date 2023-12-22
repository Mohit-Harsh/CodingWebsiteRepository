from rest_framework import serializers
from .models import ApiProblems, SolvedProblems

class ProblemSerializer(serializers.ModelSerializer):

    class Meta:

        model = ApiProblems
        fields = [
            "id",
            "title",
            "description",
            "is_premium",
            "difficulty",
            "acceptance_rate",
            "frequency",
            "url",
            "discuss_count",
            "accepted",
            "submissions",
            "companies",
            "related_topics",
            "likes",
            "dislikes",
            "rating",
            "asked_by_faang", 
        ]

class SolvedProblemSerializer(serializers.ModelSerializer):

    class Meta:

        model = SolvedProblems
        fields = ['id', 'userid', 'problemid', 'date', 'time', 'accuracy']