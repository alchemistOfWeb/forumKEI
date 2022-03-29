from rest_framework import serializers
from .models import Topic, TopicComment, Section, Profile
from django.db.models import Count

class SectionSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["total_topics"] = instance.topics.count()
        return rep

    class Meta:
        model = Section
        fields = 'id', 'title'


class TopicSerializer(serializers.ModelSerializer): 

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["total_comments"] = instance.comments.count()
        return rep

    class Meta:
        model = Topic
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'


class TopicCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = TopicComment
        fields = '__all__'