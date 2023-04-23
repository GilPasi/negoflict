from .chat_token_builder import ChatTokenBuilder
from rest_framework.views import APIView
import requests
from decouple import config
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from negoflict_app import permissions
from rest_framework.decorators import action
from .models import EmptyClass
from .serializers import EmptySerializer
from requests.exceptions import RequestException



HOST_URL_APP_KEY  = f"https://{config('REST_API')}/{config('ORG_NAME')}/{config('APP_NAME')}"



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




class Groups(ModelViewSet):
    queryset = EmptyClass.objects.none()
    serializer_class = EmptySerializer

    @action(detail=False, methods=['POST'], permission_classes=[permissions.IsAdminOrUser])
    def create_groups(self,request):
        token = getAppToken(5000)
        name = request.data.get('groupname',None)
        description = request.data.get('desc','No description')
        max_users = request.data.get('maxusers',50)
        owner = request.data.get('owner',None)
        
        
        missing_props = {
            **({'error':'groupname missing'} if not name else {}),
             **({'error': 'owner missing'} if not owner else {}),
        }
        if len(missing_props) > 0:
            print('missing params',missing_props)
            return Response({'missing properties':missing_props}, status=status.HTTP_400_BAD_REQUEST)
        
        
        sides = ['A','B','G']
        responses = []
        
        headers = {
        'Authorization': f"Bearer {token}",
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
        for i in range(len(sides)):
            name_side = f"{name}_{sides[i]}"
                
            payload = {
                    'groupname': name_side,
                    'desc': description,
                    'public': False,
                    'maxusers': max_users,
                    'owner': owner,
                    'members': [owner]
                }
            try:    
                res = requests.post(f"{HOST_URL_APP_KEY}/chatgroups", json=payload, headers=headers)
                res.raise_for_status()
                print(res)
                responses.append({sides[i]:res})
            except RequestException as e:
                print(f"agora error {e}")
                return Response(f"somthing went wrong in agora when creating group side {sides[i]}", status=status.HTTP_200_OK)
        return Response({'AgoraResponse':responses}, status=status.HTTP_200_OK)

                
                
                
                
        
        
        
        
        
        
        
        





























