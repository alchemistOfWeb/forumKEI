from unicodedata import name
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet, TopicCommentViewSet, section_list


router = DefaultRouter()
# router.register('section', views.BoardViewSet, basename='boards')
# router.register('tags', views.TaskTagViewSet, basename='tags')
router.register(r'sections/(?P<section_pk>\d+)/topics', 
                TopicViewSet, basename='topics')

router.register(r'sections/(?P<section_pk>\d+)/topics/(?P<topic_pk>\d+)/comments',
                TopicCommentViewSet, basename='comments')

urlpatterns = [
    # path('profile_block/', views.profile_block, name='profile_block'), # post
    # path('profile/', views.profile, name='profile'), # get|patch|delete
    path('sections/', section_list, name='section_list'), # get
    # path('signin/', views.signin, name='signin'), # post
    # path('signup/', views.signup, name='signup'), # post
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
] + router.urls
