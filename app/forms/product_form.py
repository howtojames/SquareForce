from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ProductForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    condition = StringField("Condition", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    imageUrl = StringField("imageUrl", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    #category = StringField("Category", validators=[DataRequired()])
