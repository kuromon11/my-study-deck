from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DeckViewSet, CardViewSet, CardListByDeckView, StudyLogViewSet, CardDetailByDeckView, DeckCardListWithLogsView

router = DefaultRouter()
router.register(r'decks', DeckViewSet)
router.register(r'cards', CardViewSet)
router.register(r'study-logs', StudyLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(
        'decks/<int:deck_id>/cards/',
        CardListByDeckView.as_view(),
        name='deck-cards',
    ),
    path('decks/<int:deck_id>/cards/<int:pk>/', CardDetailByDeckView.as_view(), name='deck-card-detail'),
    path(
        'decks/<int:deck_id>/cards-with-logs/',
        DeckCardListWithLogsView.as_view(),
        name='cards-with-logs'
    ),
]
