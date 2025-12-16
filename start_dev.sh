#!/bin/bash

set -e

# backend ディレクトリ（このスクリプトが置かれている場所）
BASE_DIR=$(cd "$(dirname "$0")" && pwd)

# --- クリーンアップ処理 ---
cleanup() {
  echo ""
  echo "Shutting down servers..."

  if [[ -n "$DJANGO_PID" ]] && kill -0 "$DJANGO_PID" 2>/dev/null; then
    kill "$DJANGO_PID"
  fi

  if [[ -n "$VUE_PID" ]] && kill -0 "$VUE_PID" 2>/dev/null; then
    kill "$VUE_PID"
  fi

  wait
  echo "All servers stopped."
}

# Ctrl+C や kill を捕捉
trap cleanup SIGINT SIGTERM EXIT

echo "Starting Django API (8000)..."
cd "$BASE_DIR/backend"
pipenv run python manage.py runserver 8000 &
DJANGO_PID=$!

echo "Starting Vue Frontend (5173)..."
cd "$BASE_DIR/frontend"
npm run dev &
VUE_PID=$!

# 両方が生きている間は待機
wait
