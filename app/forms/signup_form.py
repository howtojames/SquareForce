from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def invalid_email(form, field):
    # Checking if user exists
    email = field.data
    if "@" not in email:
        raise ValidationError('Invalid Email.')
    elif len(email) < 7:
        raise ValidationError('Email must be at least 7 characters long.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, invalid_email])
    password = StringField('password', validators=[DataRequired()])
