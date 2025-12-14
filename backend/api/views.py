from rest_framework.viewsets import ModelViewSet
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


class StudyLogViewSet(ModelViewSet):
    queryset = StudyLog.objects.all()
    serializer_class = StudyLogSerializer
