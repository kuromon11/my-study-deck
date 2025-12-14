from django.db import models

class Deck(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class Card(models.Model):
    deck = models.ForeignKey(
        Deck,
        on_delete=models.CASCADE,
        related_name='cards'
    )
    question = models.TextField(max_length=500)
    answer = models.TextField(max_length=500)
    notes = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.deck.id} - {self.question[:50]}'

    class Meta:
        ordering = ['-created_at']

class StudyLog(models.Model):
    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        related_name='study_logs'
    )
    studied_at = models.DateTimeField(auto_now_add=True)
    is_correct = models.BooleanField()

    def __str__(self):
        return f'{self.card.id} - {self.studied_at:%Y-%m-%d %H:%M:%S}'

    class Meta:
        ordering = ['-studied_at']
