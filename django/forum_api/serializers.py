from rest_framework.serializers import ModelSerializer
from .models import Topic, TopicComment, Section, Profile

class SectionSerializer(ModelSerializer):
    
    class Meta:
        model = Section
        fields = '__all__'


class ProfileSerializer(ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'


class TopicSerializer(ModelSerializer):
    
    class Meta:
        model = Topic
        fields = '__all__'

    
class TopicCommentSerializer(ModelSerializer):

    class Meta:
        model = TopicComment
        fields = '__all__'