from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from .models import Deck, Card, StudyLog
from .serializers import (
    DeckSerializer,
    CardSerializer,
    StudyLogSerializer,
)


class DeckViewSet(ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer


class CardViewSet(ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class CardListByDeckView(ListAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(deck_id=self.kwargs['deck_id'])


class StudyLogViewSet(ModelViewSet):
    queryset = StudyLog.objects.all()
    serializer_class = StudyLogSerializer
