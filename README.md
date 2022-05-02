# forumKEI
> developed by Nikita Kuznetsov


* [1. Формулировка тз](#task_description)
* [2. Установка и настройка](#setup)
    * [1. Установка зависимостей](#dependences)
    * [2. Секретный ключ](#create_secret_key)
    * [3. Настройка базы данных](#setup_db)
    * [4. Миграции](#migrations)
    * [5. Предварительный парсинг всех продуктов](#scrap_sitemap)
    * [6. Для доступа к админке ](#admin_panel)
    * [7. Запуск тестового сервера](#test_server)
* [3. Описание функционала приложения](#description)
    * [Регистрация и вход](#auth)
    * [Пользователи](#users)
    * [Ссылки на все товары](#products)
    * [Список комментариев к товару](#opinions)


## 1. Формулировка тз:
<a name="task_description"></a> 


### Общие требования: 

* Написать сайт форума

* [ ] регистрация/вход/выход/изменение данных
    * [ ] пароль
    * [ ] почта
    * [ ] никнейм
    * [ ] дата регистрации
    * [ ] рейтинг (зависит лайков и дизов)
    * [ ] кол-во комментов
* [ ] список разделов форума (главная страница)
* [ ] обзор топик раздела. У одного топика показывать
    * [ ] название. (возможен поиск по этому полю)
    * [ ] кол-во комметариев
    * [ ] дата создания
    * [ ] статус (открыт/закрыт)
    * [ ] доступность (публичный/приватный/по рейтингу)
    * [ ] автор (его никнейм)
* [ ] фильтровать топики по
    * [ ] дате создания
    * [ ] кол-ву комментов
    * [ ] статусу
    * [ ] доступности
* [ ] поиск среди топиков по названию.
* [ ] возможности гостя
    * [ ] смотреть комментарии на топиках с публичным доступом.
* [ ] возможности пользователя. То же что и для гостя +
    * [ ] добавлять комментарии в топике.
    * [ ] отвечать на др. комментарии.
    * [ ] создавать новые топики.
* [ ] возможности для модератора. То же что и для пользователя +
    * [ ] блокировать комментарии в топиках
    * [ ] блокировать топик
    * [ ] блокировать пользователя с указанием причины блокировки

<br><br>

---
---
---
---

<br>  

## 2. Установка и настройка
<a name="setup"></a> 

### 1 Установка зависимостей
<a name="dependences"></a> 

Для начала установите python.

```bash
cd нужный каталог
git clone https://github.com/alchemistOfWeb/forumKEI.git
cd forumKEI/django
pipenv # чтобы установить зависимости
```

Далее установите и настройте geckodriver (нужно для работы selenium).
скачать можно отсюда, выбрав архив подходящий под вашу ОС https://github.com/mozilla/geckodriver/releases. После скачивания, распакуйте
После его установки укажите путь в файле `opinion_scrapper/opinion_scrapper/settings.py` в переменную `GECKODRIVER_PATH`.


### 2 Секретный ключ
<a name="create_secret_key"></a> 

Для начала скопируйте файл .env.example и уберите строку `.example` из названия копии (оставьте только `.env`)

Создайте секретный ключ и добавьте в настройки соответствующими командами:
```bash
pipenv run python manage.py shell
>>> from django.core.management.utils import get_random_secret_key
>>> print(get_random_secret_key()) # скопируйте полученный командой ключ
>>> exit()
pipenv run dotenv set SECRET_KEY 'getted_secret_key' # сюда нужно вставить полученный ключ
```

### 3 Настройка базы данных
<a name="setup_db"></a> 

Установите настройки для вашей бд в `.env` файле. Ниже приведён пример и названия параметров, которые можно использовать. 
```py
DB_NAME='opinion_scrapper'
DB_USER='admin'
DB_PASS='admin'
DB_HOST='127.0.0.1'
DB_PORT='5432'
```
По умолчанию используется движок `postgress`, для его изменения измените значение словаря `DATABASES` в `opinion_scrapper/settings.py`.
Посмотреть корректные названия движков для подключения к др. базам данных можно на https://docs.djangoproject.com/en/3.1/ref/databases/

### 4 Миграции
<a name="migrations"></a> 

Сделайте миграции в вашу бд
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Предварительный парсинг всех продуктов 
<a name="scrap_sitemap"></a> 

из каталога с `manage.py` выполните следующую команду. Будет выполняться несколько часов.
```bash
python manage.py scrape_products
```
затем следующую для скрапинга всех комментариев для этих товаров
```bash
python manage.py scrape_opinions
```


### 6 Для доступа к админке 
<a name="admin_panel"></a> 

> Пропустите этот шаг, если вы выполнили django-миграцию бд (см. шаг 3)
Создайте суперюзера для доступа к админке
```bash
python manage.py create superuser
name: ******* # придумайте, например admin
pas: ********** # придумайте, например admin
```

### 7 Запуск тестового сервера
<a name="test_server"></a> 

теперь можно запустить тестовый сервер
```bash
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
pipenv run python manage.py runserver
```

## 3. Описание функционала приложения
<a name="description"></a> 

### регистрация/вход
<a name="auth"></a> 

Нового пользователя может создать только админ. Вход стандартный из коробки django

### пользователи
<a name="users"></a> 

Cтандартно из коробки django

### ссылки на все товары
<a name="products"></a>

Карта сайта с ссылками на все товары. Нужно для парсинга комментариев.
Написал изходя из предположения, что на сайт днс периодически будут добавлятся новые товары, а также новые категории товаров.

### список комментариев(отзывов) пользователей
<a name="opinions"></a>

Для каждого комментария спарсены все необходимые данные