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
        'PORT': os.environ["DB_PORT"]
    }
}


def get_environ_list(k):
    return os.environ[k].split(",") if k in os.environ.keys() else []


CORS_ALLOWED_ORIGINS = get_environ_list("CORS_ALLOWED_ORIGINS")
CORS_ALLOWED_ORIGIN_REGEXES = get_environ_list("CORS_ALLOWED_ORIGIN_REGEXES")

ALLOWED_HOSTS = get_environ_list("ALLOWED_HOSTS")

print(CORS_ALLOWED_ORIGINS, CORS_ALLOWED_ORIGIN_REGEXES)
