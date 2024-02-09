from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired()])
