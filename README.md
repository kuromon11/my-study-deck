# 暗記アプリ My Study Deck

## 概要
- 暗記カードを使った学習ができるアプリケーションです。
- デッキは複数作成でき、それぞれのデッキに複数のカードを作成できます
- 作成したデッキ・カードを使って、繰り返し学習できます。
- 学習内容は記録されます。

## 技術スタック

### Backend

- Python 3.10.12
- Django 5.2.9
- django-cors-headers 3.16.1
- djangorestframework 4.9.0

### Frontend

- Vue 3.5.24
- VueRouter 4.6.4
- Vuetify 3.11.4
- TypeScript 5.9.3
- Vite 7.2.4

## 画面

### デッキ一覧画面

- デッキが一覧表示される
- デッキの登録・編集・削除ができる
- カード一覧画面に遷移できる

### カード一覧画面

- カードが一覧表示される
- カードの登録・編集・削除ができる
- 学習画面、デッキ一覧画面に遷移できる

### 学習画面

- 問題、正答率、残りの問題数が表示される
- 「答えを見る」ボタン押下で、答えが表示される
- 「〇」「×」「スキップ」ボタン押下で、次の問題が表示される

## テーブル構成

### Deck（デッキ）

| カラム名    | 型                    | 説明         |
| ----------- | --------------------- | ------------ |
| id          | AutoField             | PK           |
| title       | CharField(50)        | デッキ名     |
| created_at  | DateTimeField         | 作成日時     |
| updated_at  | DateTimeField         | 更新日時     |

### Card（カード）

| カラム名   | 型                    | 説明               |
| ---------- | --------------------- | ------------------ |
| id         | AutoField             | PK                 |
| deck_id    | ForeignKey(Deck)      | デッキ ID          |
| question   | TextField             | 問題（例：英単語） |
| answer     | TextField             | 答え（例：意味）   |
| created_at | DateTimeField         | 作成日時           |
| updated_at | DateTimeField         | 更新日時           |

### StudyLog（学習ログ）

| カラム名   | 型               | 説明       |
| ---------- | ---------------- | ---------- |
| id         | AutoField        | PK         |
| card_id    | ForeignKey(Card) | カード ID  |
| studied_at | DateTimeField    | 学習日時   |
| is_correct | BooleanField     | 正解したか |
