from rest_framework.routers import DefaultRouter
from .views import DeckViewSet, CardViewSet, StudyLogViewSet

router = DefaultRouter()
router.register(r'decks', DeckViewSet)
router.register(r'cards', CardViewSet)
router.register(r'study-logs', StudyLogViewSet)

urlpatterns = router.urls
