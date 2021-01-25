from django.urls import path
from .views import *


urlpatterns = [
    path('current-user/', get_current_user),
    path('users/create', CreateUserView.as_view()),
    path('upload/', UploadFileView.as_view()),
    path('fetch-all/', FetchAllUserDataView.as_view()),
]