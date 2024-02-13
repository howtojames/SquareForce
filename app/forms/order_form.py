from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    total = IntegerField("Total", validators=[DataRequired()])
