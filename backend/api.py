import json
from flask import jsonify ,request 
from config import app, db ,bcrypt,port
from models import Task, User
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token ,unset_jwt_cookies,get_jwt,get_jwt_identity,jwt_required




@app.route("/api" , methods=["GET","POST"])
@jwt_required()

def index():
    user_id = request.json.get("user_id")
    tasks = Task.query.filter_by(user_id=user_id).all()
    json_task = list(map(lambda x: x.to_json(), tasks))
    return jsonify({"tasks": json_task}) , 201

@app.route("/api/create_task", methods=["POST"])
@jwt_required()
def create_task():
    data = request.get_json() 
    
    if not data:
        return jsonify({"message": "Invalid data provided"}), 400  
    
    task_description = data.get("task")  
    is_completed = data.get("isCompleted", False)
    is_actived = data.get("isActived", True)
    task_id=data.get("id")
    
    if not task_description:
        return jsonify({"message": "Task description is required"}), 400
    new_task = Task(task=task_description, completed=is_completed , actived = is_actived, user_id=task_id)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500 
    return jsonify({"message": "Task created successfully", "task": {"id": new_task.id, "task": new_task.task, "completed": new_task.completed}}), 201

@app.route("/api/delete_task/<int:task_id>" , methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return f"Not found task with this id:{task_id}"
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message" : "Task deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message" : e})

@app.route("/api/clear_all", methods=["DELETE"])
@jwt_required()
def clear_all():
   try:
        db.session.query(Task).delete()  
        db.session.commit()  
        return jsonify({"message": "All tasks have been cleared."}), 200  
   except Exception as e:
        db.session.rollback()  
        return jsonify({"error": str(e)}), 500  

@app.route("/api/actived/<int:id>", methods=["PATCH"])
@jwt_required()
def actived(id):
    item = Task.query.get(id)
    if not item:
        return jsonify({"message": "Task not found"}), 404

    try:
        item.actived = False
        item.completed = True
        db.session.commit()
        return jsonify({"message": "Task marked as completed"}), 200
    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500   

@app.route("/api/active",methods=["GET","POST"])
@jwt_required()
def active():
    user_id = request.json.get("user_id")
    acitve_tasks = Task.query.filter_by(actived=True,user_id=user_id).all()
    if len([acitve_tasks]) == 0 :
        return jsonify({"message": "not found"}), 404
    
    json_task = list(map(lambda x: x.to_json(), acitve_tasks))
    return jsonify({"tasks" : json_task}) , 201

@app.route("/api/complete",methods=["GET","POST"])
@jwt_required()
def complete():
    user_id = request.json.get("user_id")
    completed_tasks = Task.query.filter_by(actived=False,user_id=user_id).all()
    if len([completed_tasks]) == 0 :
        return jsonify({"tasks": "not found"}), 
    
    json_task = list(map(lambda x: x.to_json(), completed_tasks))
    return jsonify({"tasks" : json_task}) , 201



# Authetication


@app.route("/api/register" , methods=["POST"])
def register():
    try:
        username = request.json.get("username")
        email = request.json.get("email")
        password = request.json.get("password")

        user_exists = User.query.filter_by(email=email).first() is not None
        
        if user_exists:
            return jsonify({"message" : "User already exists"}) , 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(email=email , password=hashed_password ,username = username)
        access_token = create_access_token(identity=email)
        db.session.add(new_user)
        db.session.commit()
        
                
        return jsonify({"id" : new_user.id,"email" : new_user.email , "username" : new_user.username , "access_token" :access_token})
    except Exception as e:
        return jsonify({"message" : e})

@app.route("/api/login" ,methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user= User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"message" : "Unauthorized"}) ,401
    
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"message" : "Unauthorized"}) ,401
        
    access_token = create_access_token(identity=email)

    return jsonify({"id" : user.id,"email" : user.email , "username" : user.username , "access_token" :access_token})


@app.route("/api/logout",methods=["POST"])
def logout():
    response = jsonify({"message" : "Logout successfully"}) 
    unset_jwt_cookies(response)
    return response


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        # db.drop_all()
        
    app.run(debug=True,host="0.0.0.0",port=5000)
    
