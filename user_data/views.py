from django.shortcuts import render

from .serializers import UserSerializerWithToken, FullUserSerializer, UserDataSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
import simplejson as json

from .models import UserData
from django.core.files import File


@api_view(['GET'])
def get_current_user(request):
    serializer = FullUserSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request):
        user = request.data.get('user')
        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})
        serializer = UserSerializerWithToken(data = user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})
        return Response({"response" : "success", "message" : "user created succesfully"})


class FetchAllUserDataView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self,request):
        user_data = list(UserData.objects.all())
        res_data = []
        if not user_data:
            return Response({'response' : 'error', 'message' : 'No data found'})
        for ud in user_data:
            data = {
                'id': ud.id,
                'userId': ud.user.pk,
                'title': ud.title,
                'body': ud.body
            }
            res_data.append(data)
        return Response(json.dumps(res_data))


class UploadFileView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request):
        file = request.FILES.get('file')
        if not file:
            return Response({'response' : 'error', 'message' : 'No file found'})
        data = self.parse_userdata_objecs_from_file(file)
        self.save_userdata_to_db(data)
        return Response({"response" : "success", "message" : "File uploaded succesfully"})

    def save_userdata_to_db(self, data):
        if not data:
            return
        for user_data in data:
            userdata_id = user_data.get('id')
            user_id = user_data.get('userId')
            title = user_data.get('title')
            body = user_data.get('body')
            try:
                UserData.objects.create(id=userdata_id, user_id=user_id, title=title, body=body)
            except Exception as e:
                print('Unable to save data with exception {}'.format(e))
        return            

    def parse_userdata_objecs_from_file(self, file):
        data = []
        f = File(file)
        try:
            data = json.loads(f.read().decode('utf-8'))
        except Exception:
            print("Unable to load json file")
        return data

