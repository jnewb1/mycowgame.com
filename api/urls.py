from django.urls import include, path
from rest_framework import routers
from api.views import GameViewSet

router = routers.DefaultRouter()
router.register(r'games', GameViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls))
]
