from django.urls import path
from users.views import RegisterUserView, UpdateUserView, LogoutView, CustomTokenObtainPairView, user_autocomplete, UserDetailView, CurrentUserDetailView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update/', UpdateUserView.as_view(), name='update_user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('autocomplete/', user_autocomplete, name='user-autocomplete'),
   # path('<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    # For fetching current user's details
    path('me/', CurrentUserDetailView.as_view(), name='current-user-detail'),




]
