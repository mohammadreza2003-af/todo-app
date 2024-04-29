from flask import jsonify ,request ,abort ,session
from config import app, db ,bcrypt
from models import Task, User






@app.route("/api" , methods=["GET"])
def index():
    
    tasks = Task.query.all()
    json_task = list(map(lambda x: x.to_json(), tasks))
    return jsonify({"tasks": json_task}) , 201


@app.route("/api/create_task", methods=["POST"])
def create_task():
    data = request.get_json() 
    
    if not data:
        return jsonify({"message": "Invalid data provided"}), 400  
    
    task_description = data.get("task")  
    is_completed = data.get("isCompleted", False)
    is_actived = data.get("isActived", True)
    
    if not task_description:
        return jsonify({"message": "Task description is required"}), 400
    new_task = Task(task=task_description, completed=is_completed , actived = is_actived)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500 
    return jsonify({"message": "Task created successfully", "task": {"id": new_task.id, "task": new_task.task, "completed": new_task.completed}}), 201

@app.route("/api/delete_task/<int:task_id>" , methods=["DELETE"])
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
def clear_all():
   try:
        db.session.query(Task).delete()  
        db.session.commit()  
        return jsonify({"message": "All tasks have been cleared."}), 200  
   except Exception as e:
        db.session.rollback()  
        return jsonify({"error": str(e)}), 500  


@app.route("/api/actived/<int:id>", methods=["PATCH"])
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


@app.route("/api/active",methods=["GET"])
def active():
    
    acitve_tasks = Task.query.filter_by(actived=True).all()
    if len([acitve_tasks]) == 0 :
        return jsonify({"message": "not found"}), 404
    
    json_task = list(map(lambda x: x.to_json(), acitve_tasks))
    return jsonify({"tasks" : json_task}) , 201


@app.route("/api/complete",methods=["GET"])
def complete():
    
    completed_tasks = Task.query.filter_by(actived=False).all()
    if len([completed_tasks]) == 0 :
        return jsonify({"tasks": "not found"}), 
    
    json_task = list(map(lambda x: x.to_json(), completed_tasks))
    return jsonify({"tasks" : json_task}) , 201



# Authetication

@app.route("/api/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
       return jsonify({"message" : "Unauthorized"}) ,401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({"id" : user.id,"email" : user.email})



@app.route("/api/register" , methods=["POST"])
def register():
    try:
        email = request.json.get("email")
        password = request.json.get("password")

        user_exists = User.query.filter_by(email=email).first() is not None
        
        if user_exists:
            return jsonify({"message" : "User already exists"}) , 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(email=email , password=hashed_password)
        
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        
        return jsonify({"id" : new_user.id,"email" : new_user.email})
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
        
    session["user_id"] = user.id
    
    return jsonify({"id" : user.id,"email" : user.email})


@app.route("/api/logout",methods=["POST"])
def logout():
    session.pop("user_id")
    return jsonify({"message" : "Logout successfully"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        # db.drop_all()
        
    app.run(debug=True)
    
