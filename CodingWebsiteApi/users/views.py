from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime
# Create your views here.

class RegisterView(APIView):

    def post(self,request):

        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):

        email = request.data['email']
        password = request.data[('password')]

        user = User.objects.filter(email=email).first()

        if user is None:

            raise AuthenticationFailed('email not found!')

        if not user.check_password(password):

            raise AuthenticationFailed("incorrect password!")

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload=payload, key='secret', algorithm='HS256')

        response = Response()

        response.data = {'login': "sucess"}

        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True, expires=datetime.datetime.utcnow()+datetime.timedelta(minutes=60))

        return response

class LogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {'detail': 'logout successful'}

        return response
