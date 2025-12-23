from django.db.models import Prefetch
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Deck, Card, StudyLog
from .serializers import (
    DeckSerializer,
    CardSerializer,
    StudyLogSerializer,
    CardWithLogsSerializer,
)


class DeckViewSet(ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer


class CardViewSet(ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class CardListByDeckView(ListCreateAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(deck_id=self.kwargs['deck_id'])

    def perform_create(self, serializer):
        deck_id = self.kwargs["deck_id"]
        serializer.save(deck_id=deck_id)


class CardDetailByDeckView(RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        deck_id = self.kwargs["deck_id"]
        return Card.objects.filter(deck_id=deck_id)


class StudyLogViewSet(ModelViewSet):
    queryset = StudyLog.objects.all()
    serializer_class = StudyLogSerializer


class DeckCardListWithLogsView(ListAPIView):
    serializer_class = CardWithLogsSerializer

    def get_queryset(self):
        deck_id = self.kwargs["deck_id"]

        logs_qs = StudyLog.objects.order_by("-studied_at")

        return (
            Card.objects.filter(deck_id=deck_id)
            .prefetch_related(Prefetch("study_logs", queryset=logs_qs))
            .order_by("-id")
        )
