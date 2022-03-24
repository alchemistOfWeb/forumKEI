from unicodedata import name
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('profile_block/', views.profile_block, name='profile_block'), # post
    path('profile/', views.profile, name='profile'), # get|patch|delete

#     path('signin/', views.signin, name='signin'), # post
#     path('signup/', views.signup, name='signup'), # post

    path('section/', views.section_list, name='section_list'), # get

    path('section/<pk:section_pk>/topics/', views.topic_list, name='topic'), # get|post
    path('topic/<pk:topic_pk>', views.topic_detail, name='topic_detail'), 
#     patch - change title|permissions
    path('topic/<pk:topic_pk>/archive', views.topic_archive, name='topic_detail'), 
    # get - archive with comments

    path('topic/<pk:topic_pk>/comments', 
         views.topic_comment_list, 
         name='topic_comments'), 
    # get|post

    path('topic/<pk:topic_pk>/comments/<pk:comment_id>', 
         views.topic_comment_modify, 
         name='comment_modify'), 
    # patch|delete
    
    path('topic/<pk:topic_pk>/comments/<pk:comment_id>/block', 
         views.topic_comment_block, 
         name='comment_block'), 
    # post  
]
