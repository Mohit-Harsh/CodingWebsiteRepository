import jwt
import pandas as pd
from django.shortcuts import render
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.views import APIView
from django.http import JsonResponse
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import *
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework.response import Response
from .recommendations import recommend_by_topic, recommned_by_description
from rest_framework import status
from collections import defaultdict

class SimilarDescription(APIView):
    def post(self,request):

        token = request.COOKIES['jwt']

        if not token:

            raise AuthenticationFailed('Unauthorized')

        else:

            titles = recommned_by_description(description=request.data['des'])

            data = ApiProblems.objects.filter(title__in=titles)

            serialized_data = ProblemSerializer(data,many=True)

            response = Response()
            response.data = serialized_data.data

            return response

class ProblemByCompany(ListAPIView):

    serializer_class = ProblemSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id', 'rating', 'frequency', 'accepted', 'likes']
    pagination_class = PageNumberPagination
    def get_queryset(self):

        token = self.request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthorized')
        else:
            print(self.request.data)
            data = ApiProblems.objects.filter(companies__icontains = self.request.data['company'])
            return data

class TopicChart(APIView):

    def get(self, request):

        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthorized')

        else:

            payload = jwt.decode(token,'secret',algorithms="HS256")
            user_id = payload['id']
            user_problems_objects = SolvedProblems.objects.filter(userid=user_id)
            user_problems_data = SolvedProblemSerializer(user_problems_objects, many=True).data
            user_problems_ids = [x['problemid'] for x in user_problems_data]

            problem_objects = ApiProblems.objects.filter(id__in=user_problems_ids)
            problem_list = ProblemSerializer(problem_objects, many=True).data

            easy = {"Solved": defaultdict(int), "Time": defaultdict(int), "Accuracy": defaultdict(int)}
            medium = {"Solved": defaultdict(int), "Time": defaultdict(int), "Accuracy": defaultdict(int)}
            hard = {"Solved": defaultdict(int), "Time": defaultdict(int), "Accuracy": defaultdict(int)}

            for i in range(len(user_problems_data)):

                p = [x.strip() for x in problem_list[i]['related_topics'].split(",")]

                for topic in p:

                    easy["Solved"][topic] = 0
                    easy["Accuracy"][topic] = 0
                    easy["Time"][topic] = 0

                    medium["Solved"][topic] = 0
                    medium["Accuracy"][topic] = 0
                    medium["Time"][topic] = 0

                    hard["Solved"][topic] = 0
                    hard["Accuracy"][topic] = 0
                    hard["Time"][topic] = 0


            for i in range(len(user_problems_data)):

                p = [x.strip() for x in problem_list[i]['related_topics'].split(",")]

                for topic in p:

                    if problem_list[i]['difficulty'] == 'Easy':
                        easy["Solved"][topic] += 1
                        easy["Accuracy"][topic] += float(user_problems_data[i]['accuracy'])
                        easy["Time"][topic] += int(user_problems_data[i]['time'])

                    elif problem_list[i]['difficulty'] == 'Medium':
                        medium["Solved"][topic] += 1
                        medium["Accuracy"][topic] += float(user_problems_data[i]['accuracy'])
                        medium["Time"][topic] += int(user_problems_data[i]['time'])

                    elif problem_list[i]['difficulty'] == 'Hard':
                        hard["Solved"][topic] += 1
                        hard["Accuracy"][topic] += float(user_problems_data[i]['accuracy'])
                        hard["Time"][topic] += int(user_problems_data[i]['time'])

            for topic in easy["Accuracy"].keys():
                try:
                    easy["Accuracy"][topic] /= easy['Solved'][topic]
                    easy['Time'][topic] //= easy['Solved'][topic]
                except:
                    pass

            for topic in medium["Accuracy"].keys():
                try:
                    medium["Accuracy"][topic] /= medium['Solved'][topic]
                    medium['Time'][topic] //= medium['Solved'][topic]
                except:
                    pass

            for topic in hard["Accuracy"].keys():
                try:
                    hard["Accuracy"][topic] /= hard['Solved'][topic]
                    hard['Time'][topic] //= hard['Solved'][topic]
                except:
                    pass

            response = Response()

            response.data = {"Easy": easy, "Medium": medium, "Hard": hard}

            return response

class CompanyChart(APIView):

    def get(self, request):

        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthorized')

        else:

            payload = jwt.decode(token,'secret',algorithms="HS256")
            user_id = payload['id']
            user_problems_objects = SolvedProblems.objects.filter(userid=user_id)
            user_problems_data = SolvedProblemSerializer(user_problems_objects, many=True).data
            user_problems_ids = [x['problemid'] for x in user_problems_data]

            problem_objects = ApiProblems.objects.filter(id__in=user_problems_ids)
            problem_list = ProblemSerializer(problem_objects, many=True).data

            solved = defaultdict(int)
            time = defaultdict(int)
            accuracy = defaultdict(float)

            for i in range(len(user_problems_data)):

                p = [x.strip() for x in problem_list[i]['companies'].split(",")]

                for company in p:

                    solved[company] += 1
                    accuracy[company] += float(user_problems_data[i]['accuracy'])
                    time[company] += int(user_problems_data[i]['time'])

            for company in accuracy.keys():

                accuracy[company] /= solved[company]
                time[company] //= solved[company]

            response = Response()

            response.data = {"Solved": solved, "Time": time, "Accuracy": accuracy}

            return response

class ProblemByIdList(APIView):

    def get(self, request):

        token = request.COOKIES['jwt']
        if not token:

            raise AuthenticationFailed('Unauthorized')
        else:

            id_list = request.data['idlist']
            problem_list = ApiProblems.objects.filter(id__in=id_list)
            serializer = ProblemSerializer(problem_list, many=True)
            response = Response()
            response.data = serializer.data

            return response
class SimilarProblems(APIView):

    def post(self,request):

        if not request.COOKIES['jwt']:
            raise AuthenticationFailed('Unauthorized')

        else:

            topics = request.data['topics']
            response = Response()

            if len(topics) > 0:

                topics = [x.strip() for x in topics.split(',')]

                recommendations = recommend_by_topic(topics=topics)

                serialized_data = ProblemSerializer(recommendations, many=True)

                response.data = serialized_data.data

                return response

            else:

                response.data = {}
                return response


class AllProblems(ListAPIView):

    serializer_class = ProblemSerializer
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_fields = {'title':['icontains'], 'difficulty':['icontains'], 'related_topics':['icontains']}
    ordering_fields = ['id','rating','frequency','accepted','likes']
    pagination_class = PageNumberPagination

    def get_queryset(self):

        token = self.request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthorized')
        else:
            return ApiProblems.objects.all()



class SolvedProblemsView(APIView):

    def get(self,request):

        token = request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthorized')
        else:
            payload = jwt.decode(token,'secret',algorithms='HS256')
            data = SolvedProblems.objects.filter(userid=payload['id'])
            serialized_data = SolvedProblemSerializer(data, many=True)
            response = Response()
            response.data = serialized_data.data
            print(serialized_data.data)
            return response

    def post(self,request):

        token = request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthorized')
        else:

            data = request.data
            payload = jwt.decode(token, 'secret', algorithms='HS256')
            data["userid"] = payload['id']
            serializer = SolvedProblemSerializer(data=data)
            if serializer.is_valid():

                serializer.save()
                response = Response()
                response.data = {"post":"success"}
                return response

            else:

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def RecomProblems(request):

    token = request.COOKIES.get('jwt')

    if not token:

        raise AuthenticationFailed("Unauthorized")

    else:

        data = ApiProblems.objects.filter(title__startswith="Long")
        serializer = ProblemSerializer(data,many=True)

        return JsonResponse(serializer.data,safe=False)

def NewProblems(request):

    token = request.COOKIES.get('jwt')

    if not token:

        raise AuthenticationFailed("Unauthorized")

    else:

        data = ApiProblems.objects.filter(title__startswith="Sum")
        serializer = ProblemSerializer(data,many=True)

        return JsonResponse(serializer.data,safe=False)




