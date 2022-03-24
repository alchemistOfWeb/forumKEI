from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Topic, TopicComment, Section, Profile
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from .serializers import TopicSerializer, TopicCommentSerializer

PAGINATION_NUM = 10


# class SectionListView(APIView)
# ----------- PROFILE ----------- #
@api_view(['POST'])
def profile_block(request, user_pk):
    get_object_or_404(Profile.objects, user=user_pk)
    data = {"message": "user blocked", "errors": []}
    return Response(data, status=status.HTTP_204_NO_CONTENT)


# ----------- SECTIONS ----------- #
@api_view(['GET'])
def section_list(request):
    data = {
        "sections": Section.objects.all()
    }
    return Response(data)


# ----------- TOPICS ----------- #
@api_view(['GET'])
def topic_list(request, section_pk):
    page = request.query_params.get('page')

    if not page:
        page = 1

    to_topic = page * PAGINATION_NUM
    from_topic = to_topic - PAGINATION_NUM

    data = {
        "topics": Topic.objects.filter(section=section_pk)[from_topic:to_topic]
    }
    return Response(data)


@api_view(['PATCH'])
def topic_detail(request, section_pk, topic_pk):
    queryset = Topic.objects
    topic = get_object_or_404(queryset, pk=topic_pk)
    serializer = TopicSerializer(topic, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(data=serializer.data, status=status.HTTP_200_OK)


# ----------- COMMENTS ----------- #
@api_view(['GET', 'POST'])
def topic_comment_list(request, section_pk, topic_pk):
    if request.method == 'GET':
        comments = TopicComment.objects.filter(topic=topic_pk)
        serializer = TopicCommentSerializer(comments, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        data = request.data
        serializer = TopicCommentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def topic_comment_modify(request, section_pk, topic_pk, comment_id):
    queryset = TopicComment.objects
    comment = get_object_or_404(queryset, pk=comment_id)
    serializer = TopicCommentSerializer(comment, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(status=status.HTTP_205_RESET_CONTENT)


@api_view(['PATCH'])
def topic_comment_archive(request, section_pk, topic_pk, comment_id):
    """
    for authenticated user
    """
    topic = Topic.objects.get()
    return Response({})


@api_view(['PATCH'])
def topic_comment_block(request, section_pk, topic_pk, comment_id):
    """
    for moderator or admin
    """
    queryset = Topic.objects
    topic = get_object_or_404(queryset, pk=topic_pk)
    serializer = TopicSerializer(topic)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
