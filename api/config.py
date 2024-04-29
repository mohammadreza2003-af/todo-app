from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_session import Session
import redis
import os

app = Flask(__name__)

bcrypt = Bcrypt(app)
CORS(app)

# Load environment variables
load_dotenv()

# Set Flask configurations
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Check for SECRET_KEY and other critical configs
if "SECRET_KEY" not in os.environ:
    raise ValueError("SECRET_KEY environment variable is missing")
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

# Configure sessions with Redis
app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

# Check Redis connection
server_session = Session(app)
try:
    app.config["SESSION_REDIS"].ping()  # This checks if Redis is reachable
except redis.exceptions.ConnectionError:
    raise ValueError("Redis server not reachable at specified URL")

db = SQLAlchemy(app)
