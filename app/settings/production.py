import json
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


def get_environ_json(k, default=[]):
    return json.loads(os.environ[k]) if k in os.environ else default


CORS_ALLOWED_ORIGINS = get_environ_json("CORS_ALLOWED_ORIGINS", [])
CORS_ALLOWED_ORIGIN_REGEXES = get_environ_json(
    "CORS_ALLOWED_ORIGIN_REGEXES", [])

ALLOWED_HOSTS = get_environ_json("ALLOWED_HOSTS", [])
