from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.views import LogoutView as DjangoLogoutView
from rest_framework import generics
from .models import CustomUser
from .serializers import UserRegistrationSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response


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
    def post(self, request, *args, **kwargs):
        """Handle logout via POST request."""
        response = super().post(request, *args, **kwargs)
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
