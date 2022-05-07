from django.apps import AppConfig


class ForumApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'forum_api'

    def ready(self) -> None:
        import forum_api.signals
