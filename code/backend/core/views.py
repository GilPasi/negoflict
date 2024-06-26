from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from negoflict_app.permissions import permissions

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.user
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            print(refresh)

            # Set the refresh token in a secure cookie
            response = JsonResponse({'access': str(access)})
            response.set_cookie('refresh_token', str(refresh), secure=True, httponly=True, samesite='strict')

            return response
        
        


class CustomTokenRefreshView(TokenRefreshView):
   
    
    
    def post(self, request, *args, **kwargs):
        print('insiiiisssddddddd')
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({'error': 'Refresh token is missing.'}, status=400)
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            return Response({'access': access_token}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class CustomDeleteCookieView(APIView):
    def delete_cookie(self, request):
         print('before delete',request.COOKIES.get('refresh_token'))
         response = Response('Cookie deleted')
         response.delete_cookie('refresh_token')
         print('after delete',request.COOKIES.get('refresh_token'))
         return response
     
    def get(self,request):
        response = self.delete_cookie(request)
        return response
         
        
          
          