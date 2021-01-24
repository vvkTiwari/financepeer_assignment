from user_data.serializers import FullUserSerializer


def custom_jwt_response_handler(token, user=None, request=None):
    return {
        'token' : token,
        'user' : FullUserSerializer(user, context={'request' : request}).data
    }