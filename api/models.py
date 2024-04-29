from datetime import datetime
from config import db
from uuid import uuid4

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Ensure auto-increment
    task = db.Column(db.String(255), nullable=False)  # Set max length and non-null constraint
    completed = db.Column(db.Boolean, default=False)  # Default value for Boolean
    actived = db.Column(db.Boolean, default=True)  # Default value for Boolean
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp for creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Update timestamp
    
    def to_json(self):
        return {    
            "id" : self.id,
            "task" : self.task,
            "completed" : self.completed,
            "actived" : self.actived,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key = True,unique = True,default = get_uuid)
    email = db.Column(db.String(345),unique = True,nullable = False)
    password = db.Column(db.Text,nullable = False)
        