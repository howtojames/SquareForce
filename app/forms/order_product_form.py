from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class OrderProductForm(FlaskForm):
    orderId = IntegerField("orderId", validators=[DataRequired()])
    productId = IntegerField("productId", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])
