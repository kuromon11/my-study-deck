from rest_framework import serializers
from .models import Deck, Card, StudyLog


class DeckSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(
        max_length=500,
        required=False,
        allow_blank=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Deck
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class CardSerializer(serializers.ModelSerializer):
    question = serializers.CharField(max_length=500)
    answer = serializers.CharField(max_length=500)
    notes = serializers.CharField(
        max_length=500,
        required=False,
        allow_blank=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Card
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class StudyLogSerializer(serializers.ModelSerializer):
    is_correct = serializers.BooleanField()
    studied_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = StudyLog
        fields = '__all__'
        # NOTE: 要素が1個のタプルには末尾にカンマが必要
        read_only_fields = ('studied_at',)
