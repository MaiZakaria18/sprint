from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.views import LogoutView as DjangoLogoutView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from .models import CustomUser
from .serializers import UserRegistrationSerializer, UserUpdateSerializer

CustomUser = get_user_model()


@api_view(['GET'])
def user_autocomplete(request):
    query = request.GET.get('q', '')
    if query:
        users = CustomUser.objects.filter(username__istartswith=query)
        user_data = [{'id': user.id, 'username': user.username}
                     for user in users]
        return Response(user_data, status=status.HTTP_200_OK)
    return Response([], status=status.HTTP_200_OK)


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        data = request.data
        if 'email' not in data or 'password' not in data:
            return Response({'error': 'Email and password required'}, status=status.HTTP_400_BAD_REQUEST)
        return super().post(request, *args, **kwargs)


class UpdateUserView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class LogoutView(DjangoLogoutView):
    def get(self, request, *args, **kwargs):
        """Handle logout via GET request."""
        super().logout(request)
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
