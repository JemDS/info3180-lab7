from flask import Flask
from app.config import Config
from flask_wtf.csrf import CSRFProtect
from flask import jsonify


UPLOAD_FOLDER = 'uploads/'

app = Flask(__name__)
csrf = CSRFProtect(app)

app.config.from_object(Config)

from app import views
