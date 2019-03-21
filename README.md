# mia

Miss inbox already

## Installation

### Docker


* Install docker
* Clone the app repository
* Copy .env.example file to .env `cp .env.example .env`
* Run `docker-compose up`

### Manual

* Clone the app repository
* Install python 3.7.x (use a virtualenv if you wish)
* Install requirements `pip install -r requirements/base.txt`
* Copy .env.example file to .env `cp .env.example .env`
* Run the server with `python manage.py runserver`

## Environment

`.env` file settings

* DEBUG=<True/False>
* ALLOWED_HOSTS=<list>
* SECRET_KEY=placeholder

## Common commands

* Running the server: `python manage.py runserver`
* Creating a superuser: `python manage.py createsuperuser`
