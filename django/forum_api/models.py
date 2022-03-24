from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


class Section(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title
    

class Topic(models.Model):
    title = models.CharField(max_length=255)
    section = models.ForeignKey(Section, on_delete=models.SET_NULL, related_name="topics")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title



class Profile(models.Model):    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    score = models.PositiveBigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TopicComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True)
    topic = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    likes = models.PositiveIntegerField(default=0)
