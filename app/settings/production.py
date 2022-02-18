from . import *
import os

DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ["DB_NAME"],
        'USER': os.environ["DB_USER"],
        'PASSWORD': os.environ["DB_PASS"],
        'HOST': os.environ["DB_HOST"],
        'PORT': os.environ["DB_PORT"],
        'CONN_MAX_AGE': 60
    }
}

CORS_ALLOWED_ORIGINS = [
    'https://mycowgame.com',
    'https://staging.mycowgame.com',
    'https://testing.mycowgame.com'
]

ALLOWED_HOSTS = [
    "api.staging.mycowgame.com",
    'api.testing.mycowgame.com',
    "api.mycowgame.com"
]
