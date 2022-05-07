from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.conf import settings
from .models import User, Profile


@receiver(post_save, sender=User)
def pre_save_board(created=None, instance=None, **kwargs):
    if created:
        # default_lists = ['todo', 'doing', 'done']
        
        # for i in range(3):
        #     newlist = TodoList(title=default_lists[i], position=i+1, board=instance)
        #     newlist.save()
        Profile.create(user=instance)
        