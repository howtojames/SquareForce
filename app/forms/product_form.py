from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

#aws s3
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.aws_helpers import ALLOWED_EXTENSIONS  #changed directory


class ProductForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    condition = StringField("Condition", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    #imageUrl = StringField("imageUrl", validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description", validators=[DataRequired()])
    #category = StringField("Category", validators=[DataRequired()])
