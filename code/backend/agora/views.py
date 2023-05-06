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
import re



HOST_URL_APP_KEY  = f"https://{config('REST_API')}/{config('ORG_NAME')}/{config('APP_NAME')}"



def getAppToken(expireTime):
    return ChatTokenBuilder.build_app_token(config('APP_ID'),config('APP_CERTIFICATE'),expireTime)

def getUserToken(expireTime,uid):
    return ChatTokenBuilder.build_user_token(config('APP_ID'),config('APP_CERTIFICATE'),uid,expireTime)

def get_auth_headers(token):
    return {
        'Authorization': f"Bearer {token}",
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }


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


    def getUserToken(self,request):
        uid = request.GET.get('uid',None)
        if uid:
            token = getUserToken(expireTime=5000,uid=uid)
            return Response({'userToken':token})
        return Response('uid is missing',status=status.HTTP_400_BAD_REQUEST)




class Groups(ModelViewSet):
    queryset = EmptyClass.objects.none()
    serializer_class = EmptySerializer


    @action(detail=False, methods=['POST'],permission_classes=[permissions.IsAdminOrUser])
    def add_users_to_groups(self,request):
        token = getAppToken(5000)
        users = request.data.get('users',None)
        

        responses =[]
        headers = get_auth_headers(token)

        if not users:
            return Response('missing users',status=status.HTTP_400_BAD_REQUEST)

        for i in range(len(users)):
            id, groups = users[i]['id'], users[i]['groups']
            responses_user = []
            if not id or not groups:
                return Response('missing id or groups',status=status.HTTP_400_BAD_REQUEST)
            for j in range(len(groups)):
                group_id = groups[j]
                try:
                    res = requests.post(f"{HOST_URL_APP_KEY}/chatgroups/{group_id}/users/{id}",headers=headers)
                    res.raise_for_status()
                    responses_user.append(res.json()['data'])
                except RequestException as e:
                    return Response(f"agora error:{e}")
            responses.append(responses_user)
        return Response(responses,status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['POST'], permission_classes=[permissions.IsAdminOrUser])
    def adding_many_users_to_group(self,request):
        token = getAppToken(5000)
        Users = request.data.get('users', None)
        group_id = request.data.get('group',None)
        
        missing_props = {
            **({'error':'group missing'} if not group_id else {}),
             **({'error': 'users missing'} if not Users else {}),
        }
        
        headers = get_auth_headers(token)
        
        if len(missing_props) > 0:
            return Response({'missing properties':missing_props}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            res = requests.post(f"{HOST_URL_APP_KEY}/chatgroups/{group_id}/users",headers=headers,data={'usernames':Users})
        except RequestException as e:
            return Response(f"agora error: {e}")


    @action(detail=False, methods=['DELETE'], permission_classes=[permissions.IsAdminOrUser])
    def delete_groups(self,request):
        token = getAppToken(5000)
        group_ids = request.data.get('groups',None)

        headers = get_auth_headers(token)
        responses = []

        if group_ids:
            for group in group_ids:
                groupid = group['groupid']

                if not groupid:
                    return Response('missing groupid',status=status.HTTP_400_BAD_REQUEST)
                try:
                    res = requests.delete(f"{HOST_URL_APP_KEY}/chatgroups/{groupid}",headers=headers)
                    res.raise_for_status()
                    responses.append(res.json()['data'])
                except RequestException as e:
                    return Response(f"agora error: {e}")
            return Response({'responses':responses})
        return Response('missing parameter: groups',status=status.HTTP_400_BAD_REQUEST)




    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_groups_by_user(self,request):
        token = getAppToken(5000)
        user = request.GET.get('username',None)
        

        headers = get_auth_headers(token)
        if user:
            try:
                res = requests.get(f"{HOST_URL_APP_KEY}/users/{user}/joined_chatgroups",headers=headers)
                res.raise_for_status()
                return Response(res.json()['data'])
            except RequestException as e:
                return Response(f"agora error: {e}")
        return Response('missing props: user',status=status.HTTP_400_BAD_REQUEST)




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
        headers = get_auth_headers(token)

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
                responses.append({sides[i]:res.json()})
            except RequestException as e:
                print(f"agora error {e}")
                return Response(f"somthing went wrong in agora when creating group side {sides[i]}", status=status.HTTP_200_OK)
        return Response({'AgoraResponse':responses}, status=status.HTTP_200_OK)


class Users(ModelViewSet):
    queryset = EmptyClass.objects.none()
    serializer_class = EmptySerializer

    @action(detail=False, methods=['POST'], permission_classes=[permissions.IsAdminOrUser])
    def register_users(self,request):
        token = getAppToken(5000)
        users = request.data.get('users',None)
        case_id = request.data.get('caseId',None)

        missing_props={
            **({'error':'users missing'} if not users else {}),
            **({'error':'case id missing'} if not case_id else {})
        }

        if len(missing_props) > 0:
            return Response({'missing parameters':missing_props}, status=status.HTTP_400_BAD_REQUEST)

        responses=[]
        headers = get_auth_headers(token)

        for i in range(len(users)):
            username, password, first_name = users[i]['username'], users[i]['password'], users[i]['first_name']
            if not username or not password or not first_name:
                return Response(f"missing values of user in index {i}", status=status.HTTP_400_BAD_REQUEST)

            uid = re.sub(r'[^\w\s]', '', username)
            payload={
                'username':uid,
                'password':password,
                'nickname':first_name,
            }


            try:
                res = requests.post(f"{HOST_URL_APP_KEY}/users",headers=headers,json=payload)
                res.raise_for_status()
                responses.append(res.json())
            except RequestException as e:
                return Response(f"agora error: {e}")

        return Response({'users':responses})


    @action(detail=False, methods=['POST'],permission_classes=[permissions.IsAdminOrUser] )
    def register_user(self,request):
        token = getAppToken(5000)
        uid = request.data.get('uid',None)
        password = request.data.get('password',None)
        username = request.data.get('username',None)

        missing_props = {
            **({'error':'missing uid'}if not uid else {}),
            **({'error': 'missing password'} if not password else {}),
            **({'error': 'missing username'} if not username else {}),
        }

        if len(missing_props) > 0:
            return Response({'missing parameters':missing_props},status=status.HTTP_400_BAD_REQUEST)

        headers = get_auth_headers(token)
        payload = {
            'username': uid,
            'password': password,
            'nickname': username
        }

        try:
            res = requests.post(f"{HOST_URL_APP_KEY}/users",json=payload,headers=headers)
            res.raise_for_status()
            return Response(res.json(),status=status.HTTP_200_OK)
        except RequestException as e:
            return Response(f"agora error: {e}")








                
                
        
        
        
        
        
        
        
        





























