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

class CustomPagination(PageNumberPagination):

    page_size = 10

class CompanyTopicSolved(APIView):

    def post(self,request):

        token = request.COOKIES['jwt']
        if not token:
            raise AuthenticationFailed('Unauthorized')

        else:

            payload = jwt.decode(token,'secret',algorithms="HS256")
            user_id = payload['id']
            user = {'count':0,'time':0,'accuracy':0,'data':defaultdict(int)}
            company = {'count':0,'data':defaultdict(int)}

            company_data = ProblemSerializer(ApiProblems.objects.filter(companies__icontains=request.data['company']).order_by('frequency'),many=True).data
            company_ids = [x['id'] for x in company_data]

            user_data = SolvedProblemSerializer(SolvedProblems.objects.filter(userid=user_id, problemid__in=company_ids), many=True).data

            company_popular_topics = set()

            for c in company_data[-10:]:

                for t in c['related_topics'].split(','):

                    company_popular_topics.add(t)

            company_popular_topics = list(company_popular_topics)[:10]

            temp = defaultdict(int)

            for c in company_data:

                company['count']+=1

                for t in c['related_topics'].split(','):

                    if t in company_popular_topics:

                        temp[t]+=1

            company['data'] = temp


            for u in user_data:

                user['count']+=1
                user['time']+= int(u['time'])
                user['accuracy']+= float(u['accuracy'])

            user['time'] = "{:.2f}".format(user['time']/user['count'])
            user['accuracy'] = "{:.2f}".format(user['accuracy'] / user['count'])

            user_data = ProblemSerializer(ApiProblems.objects.filter(id__in=[x['problemid'] for x in user_data]),many=True).data

            for t in company_popular_topics:
                for u in user_data:
                    if t in u['related_topics']:
                        user['data'][t]+=1
                    else:
                        user['data'][t]+=0

            response = Response()
            response.data = {'user':user,'company':company}

            return response


class CompanyChart(APIView):
    def get(self, request):

        token = request.COOKIES['jwt']
        if not token:

            raise AuthenticationFailed('Unauthorized')

        else:

            payload = jwt.decode(token,'secret',algorithms='HS256')
            userid = payload['id']
            userdata = SolvedProblems.objects.filter(userid=userid)
            userdata = SolvedProblemSerializer(userdata, many=True).data
            problemids = [x['problemid'] for x in userdata]
            problemslist = ApiProblems.objects.filter(id__in=problemids)
            problemslist = ProblemSerializer(problemslist, many=True).data

            solved = defaultdict(int)

            for problem in problemslist:

                for company in problem['companies'].split(','):

                    solved[company.strip()] += 1

            response = Response()
            response.data = solved

            return response

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
    ordering = ['id']
    filterset_fields= {'companies':['icontains']}
    pagination_class = CustomPagination


    def get_queryset(self):
        try:
            token = self.request.COOKIES['jwt']
            data = ApiProblems.objects.all()
            return data
        except:
            raise AuthenticationFailed('Unauthorized')
    def post(self, request, *args, **kwargs):

        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthorized')
        else:
            return self.list(request, *args, **kwargs)

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

class OverallChart(APIView):

    def get(self, request):

        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Unauthorized')

        else:

            payload = jwt.decode(token,'secret',algorithms="HS256")
            user_id = payload['id']
            user_problems_objects = SolvedProblems.objects.filter(userid=user_id)
            user_problems_data = SolvedProblemSerializer(user_problems_objects, many=True).data

            easy = {"Solved": 0, "Time": 0, "Accuracy": 0}
            medium = {"Solved": 0, "Time": 0, "Accuracy": 0}
            hard = {"Solved": 0, "Time": 0, "Accuracy": 0}

            for problem in user_problems_data:

                data = ApiProblems.objects.filter(id=problem['problemid']).first()
                serialized_data = ProblemSerializer(data).data

                if serialized_data['difficulty'] == 'Easy':

                    easy['Solved']+=1
                    easy['Time'] += int(problem['time'])
                    easy['Accuracy'] += float(problem['accuracy'])

                elif serialized_data['difficulty'] == 'Medium':

                    medium['Solved']+=1
                    medium['Time'] += int(problem['time'])
                    medium['Accuracy'] += float(problem['accuracy'])

                else:

                    hard['Solved'] += 1
                    hard['Time'] += int(problem['time'])
                    hard['Accuracy'] += float(problem['accuracy'])

            easy['Time'] = "{:.2f}".format(easy['Time'] / easy['Solved'])
            medium['Time'] = "{:.2f}".format(medium['Time'] / medium['Solved'])
            hard['Time'] = "{:.2f}".format(hard['Time'] / hard['Solved'])

            easy['Accuracy'] = "{:.2f}".format(easy['Accuracy'] / easy['Solved'])
            medium['Accuracy'] = "{:.2f}".format(medium['Accuracy'] / medium['Solved'])
            hard['Accuracy'] = "{:.2f}".format(hard['Accuracy'] / hard['Solved'])

            response = Response()

            response.data = {"Easy": easy, "Medium": medium, "Hard": hard}

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
    ordering = ['id']
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




