## コマンド
### 定番
- pipenv run python manage.py runserver

### 環境構築
- pipenv --python python3
- pipenv shell
- pipenv install django djangorestframework
- pipenv run django-admin startproject config .
- python manage.py startapp api

### APIをたたけるようにするまで
- pipenv run python manage.py makemigrations
- pipenv run python manage.py migrate

### 管理画面の作成
- pipenv run python manage.py createsuperuser
  - 情報は db.sqlite3 に格納される

### 確認内容
