from flask import Flask
from flask_sock import Sock
app = Flask(__name__)
sock = Sock(app)

app.config['UPLOAD_FOLDER'] = f"{app.root_path}/recordings/"

from rakshak.routes import insert
from rakshak.routes import createcall
from rakshak.routes import voice
from rakshak.routes import upload
