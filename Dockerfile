FROM python:3.7.2-alpine3.8

RUN apk add make automake gcc g++ python3-dev

RUN apk add --no-cache postgresql-libs \
    && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev curl \
    && apk add --no-cache

ADD . /code
WORKDIR /code

ADD requirements/base.txt /requirements.txt
RUN pip install --upgrade pip
RUN pip --no-cache-dir install -r /requirements.txt

ENV DJANGO_SETTINGS_MODULE=mia.settings
