#!/usr/bin/env sh

#остановить публикацю при ошибках
set -e

#сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория и загрузка кода в GitHub
git init
git add --all
git commit -m 'deploy'

git push -f git@github.com:dm-webdev/vue-app.git master:gh-pages

cd -