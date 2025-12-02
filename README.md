# 暗記アプリ My Study Deck

# 設計

## 画面

### デッキ一覧画面

- デッキが一覧表示される
- 「登録」「編集」ボタン押下で、デッキ登録・編集画面に遷移できる
- 学習履歴をリセットできる
- デッキを削除できる

### デッキ登録・編集画面

- 内容を入力して、登録または更新できる
- デッキ名、説明を入力できる

### カード一覧画面

- カードが一覧表示される
- 「学習開始」ボタン押下で、学習画面に遷移できる
- 「登録」「編集」ボタン押下で、カード登録・編集画面に遷移する
- カードを削除できる

### カード登録・編集画面

- 内容を入力して、登録または更新できる
- 問題、答え、メモを入力できる

### 学習画面

- 問題、正答率、残りの問題数が表示される
- 「答えを見る」ボタン押下で、答えが表示される
- 「スキップ」ボタン押下で、次の問題が表示される
- 「×」「〇」押下で、次の問題が表示される
- 全ての問題の解答が終われば、「お疲れ様でした」のようなメッセージを表示させる

## テーブル構成

### Deck（デッキ）

| カラム名    | 型                    | 説明         |
| ----------- | --------------------- | ------------ |
| id          | AutoField             | PK           |
| title       | CharField(100)        | デッキ名     |
| description | TextField(blank=True) | 説明（任意） |
| created_at  | DateTimeField         | 作成日時     |
| updated_at  | DateTimeField         | 更新日時     |

### Card（カード）

| カラム名   | 型                    | 説明               |
| ---------- | --------------------- | ------------------ |
| id         | AutoField             | PK                 |
| deck_id    | ForeignKey(Deck)      | デッキ ID          |
| question   | TextField             | 問題（例：英単語） |
| answer     | TextField             | 答え（例：意味）   |
| notes      | TextField(blank=True) | メモ               |
| created_at | DateTimeField         | 作成日時           |
| updated_at | DateTimeField         | 更新日時           |

### StudyLog（学習ログ）

| カラム名   | 型               | 説明       |
| ---------- | ---------------- | ---------- |
| id         | AutoField        | PK         |
| card_id    | ForeignKey(Card) | カード ID  |
| studied_at | DateTimeField    | 学習日時   |
| is_correct | BooleanField     | 正解したか |
