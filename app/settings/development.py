from . import *

SECRET_KEY = 'dev'

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000"
]
