from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CartProductForm(FlaskForm):
    quantity = IntegerField("Quantity", validators=[DataRequired()])
