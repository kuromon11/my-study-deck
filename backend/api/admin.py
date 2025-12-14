from django.contrib import admin
from .models import Deck, Card, StudyLog


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')
    search_fields = ('title',)
    ordering = ('-created_at',)


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('id', 'deck', 'card_question', 'created_at')
    list_filter = ('deck',)
    search_fields = ('question', 'answer')
    ordering = ('-created_at',)

    def card_question(self, obj):
        if len(obj.question) > 30:
            return f'{obj.question[:30]}...'
        return obj.question

    card_question.short_description = 'Question'


@admin.register(StudyLog)
class StudyLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'deck_title', 'card_question', 'studied_at', 'is_correct')
    list_filter = ('is_correct',)
    ordering = ('-studied_at',)

    def deck_title(self, obj):
        return obj.card.deck.title

    def card_question(self, obj):
        if len(obj.card.question) > 30:
            return f'{obj.card.question[:30]}...'
        return obj.card.question
