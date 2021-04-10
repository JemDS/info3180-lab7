from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from werkzeug.utils import secure_filename

class UploadForm(FlaskForm):
    photo = FileField('Photo',validators=[FileRequired(), FileAllowed(['jpg', 'png'], 'Images only!')])
    description = TextAreaField('Description', validators=[DataRequired()])
