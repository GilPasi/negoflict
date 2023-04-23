from .chat_token_builder import ChatTokenBuilder
from rest_framework.views import APIView
import requests
from decouple import config
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status


def getAppToken(expireTime):
    return ChatTokenBuilder.build_app_token(config('APP_ID'),config('APP_CERTIFICATE'),expireTime)

def getUserToken(expireTime,uid):
    return ChatTokenBuilder.build_user_token(config('APP_ID'),config('APP_CERTIFICATE'),uid,expireTime)


class Get_Token(APIView):
    http_method_names = ['get']

    def get(self,request, token_type):
        if token_type == 'app':
            return self.getAppToken(request)
        elif token_type == 'user':
            return self.getUserToken(request)


    def getAppToken(self,request):
        token = getAppToken(expireTime=5000)
        return  Response({'appToken':token})


    def getUserToken(self,requerst):
        uid = requerst.GET.get('uid',None)
        if uid:
            token = getUserToken(expireTime=5000,uid=uid)
            return Response({'userToken':token})
        return Response('uid is missing',status=status.HTTP_400_BAD_REQUEST)
























