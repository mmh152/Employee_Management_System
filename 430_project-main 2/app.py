from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from functools import wraps
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587  
EMAIL_ADDRESS = 'trackerexchange@gmail.com'
EMAIL_PASSWORD = 'igtp cwts loro dyks'


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def connect_to_db():
    return sqlite3.connect('work_MANAGERs1.db', check_same_thread=False)

def create_tables():
    conn = connect_to_db()
    cursor = conn.cursor()
    # Create Employees table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        gender TEXT,
        phone TEXT,
        role TEXT,
        profession TEXT
    );
    ''')
    # Create Tasks table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        date_due DATE,
        progress INTEGER,
        employee_id INTEGER,
        FOREIGN KEY (employee_id) REFERENCES Employees(id)
    );
    ''')


    cursor.execute('''
    CREATE TABLE TaskAssignments (
        task_id INTEGER,
        employee_id INTEGER,
        FOREIGN KEY (task_id) REFERENCES Tasks(id),
        FOREIGN KEY (employee_id) REFERENCES Employees(id),
        PRIMARY KEY (task_id, employee_id)
    );
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL
    );
    ''')
    
    conn.commit()
    conn.close()

create_tables()


def generate_token(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.utcnow() + timedelta(hours=1)  # Token expiration time
    }
    token = jwt.encode(payload, 'maurice', algorithm='HS256')  #i replaced 'your-secret-key' with maurice
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, 'maurice', algorithms=['HS256']) #i replaced 'your-secret-key' with maurice
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    


def login_required(role=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'error': 'Token is missing'}), 401
            
            try:
                token = auth_header.split(" ")[1] # Extract the token from the Bearer prefix
                payload = verify_token(token)
                if payload is None:
                    return jsonify({'error': 'Invalid token'}), 401
                
                if role is not None and payload['role'] != role:
                    return jsonify({'error': 'Unauthorized access'}), 403
                
                request.user_id = payload['user_id']
                request.user_role = payload['role']
            except:
                return jsonify({'error': 'Token is invalid'}), 401
            
            return func(*args, **kwargs)
        return wrapper
    return decorator


# EMPLOYEE SECTION BELOW :

@app.route('/add_employee', methods=["POST"])
@login_required(role='manager')
def add_employee():
    data = request.json
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO Employees (username, password, email, gender, phone, role, profession)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data["username"], 
            generate_password_hash(data["password"]), 
            data["email"], 
            data["gender"], 
            data["phone"], 
            data["role"], 
            data["profession"]
        ))
        conn.commit()
        return jsonify({"message": "Employee added successfully"}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()
        
@app.route('/delete_employee', methods=["DELETE"])
@login_required(role='manager')
def delete_employee():
    username = request.json.get("username")
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT id FROM Employees WHERE username = ?', (username,))
        employee = cursor.fetchone()
        if not employee:
            return jsonify({"error": "Employee not found"}), 404

        # Set employee_id to NULL for tasks assigned to this employee
        cursor.execute('UPDATE Tasks SET employee_id = NULL WHERE employee_id = ?', (employee[0],))

        cursor.execute('DELETE FROM Employees WHERE id = ?', (employee[0],))
        conn.commit()

        return jsonify({"message": "Employee deleted successfully"}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()


@app.route('/view_employees', methods=["GET"])
@login_required(role='manager')
def view_employees():
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Employees')
    employees = cursor.fetchall()
    employees_list = [{
        "id": emp[0], "username": emp[1], "email": emp[3],
        "gender": emp[4], "phone": emp[5], "role": emp[6], "profession": emp[7]
    } for emp in employees]
    conn.close()
    return jsonify(employees_list), 200

# @app.route('/view_employees/<username>', methods=["GET"])
# @login_required(role='manager')
# def get_employee(username):
#     conn = connect_to_db()
#     cursor = conn.cursor()
#     cursor.execute('SELECT * FROM Employees WHERE username = ?', (username,))
#     employee = cursor.fetchone()
#     if employee:
#         employee_data = {
#             "id": employee[0], "username": employee[1], "email": employee[3],
#             "gender": employee[4], "phone": employee[5], "role": employee[6], "profession": employee[7]
#         }
#         return jsonify(employee_data), 200
#     else:
#         return jsonify({"error": "Employee not found"}), 404

@app.route('/update_employee/<username>', methods=["PATCH"])
@login_required(role='manager')
def update_employee(username):
    data = request.json
    updates = []
    params = []
    if data.get("password"):
        updates.append("password = ?")
        params.append(generate_password_hash(data["password"]))
    if data.get("email"):
        updates.append("email = ?")
        params.append(data["email"])
    if data.get("gender"):
        updates.append("gender = ?")
        params.append(data["gender"])
    if data.get("phone"):
        updates.append("phone = ?")
        params.append(data["phone"])
    if data.get("role"):
        updates.append("role = ?")
        params.append(data["role"])
    if data.get("profession"):
        updates.append("profession = ?")
        params.append(data["profession"])
    
    params.append(username)
    conn = connect_to_db()
    cursor = conn.cursor()
    sql = f"UPDATE Employees SET {', '.join(updates)} WHERE username = ?"
    cursor.execute(sql, params)
    conn.commit()
    if cursor.rowcount:
        return jsonify({"message": "Employee updated successfully"}), 200
    else:
        return jsonify({"error": "Employee not found"}), 404
    

# TASKS SECTION BELOW 
    
#new ones added below
@app.route('/view_tasks', methods=["GET"])
@login_required(role='manager')
def view_tasks():
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT 
            t.id, t.name, t.description, t.date_due, t.progress,
            GROUP_CONCAT(e.username) as assigned_employees
        FROM Tasks t
        LEFT JOIN TaskAssignments ta ON t.id = ta.task_id
        LEFT JOIN Employees e ON ta.employee_id = e.id
        GROUP BY t.id
    ''')
    tasks = cursor.fetchall()
    tasks_list = [{
        "id": task[0], "name": task[1], "description": task[2], "date_due": task[3], "progress": task[4], "assigned_employees": task[5]
    } for task in tasks]
    conn.close()
    return jsonify(tasks_list), 200



@app.route('/add_task', methods=["POST"])
@login_required(role='manager')
def add_task():
    data = request.json
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        date_due = data["date_due"]
        if ' ' in date_due:
            date_due = date_due.split(' ')[0]  # Extract only the date portion
        cursor.execute('''
            INSERT INTO Tasks (name, description, date_due, progress)
            VALUES (?, ?, ?, ?)
        ''', (
            data["name"], 
            data["description"], 
            date_due, 
            data["progress"]
        ))
        conn.commit()
        return jsonify({"message": "Task added successfully"}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()

#new ones added above^



@app.route('/delete_task', methods=["DELETE"])
@login_required(role='manager')
def delete_task():
    task_id = request.json.get("id")
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('DELETE FROM Tasks WHERE id = ?', (task_id,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Task not found"}), 404
        return jsonify({"message": "Task deleted successfully"}), 200
    finally:
        conn.close()


@app.route('/update_task', methods=["PATCH"])
@login_required(role='manager')
def update_task():
    task_id = request.json.get("id")
    data = request.json
    conn = connect_to_db()
    cursor = conn.cursor()
    updates = []
    params = []
    if "name" in data:
        updates.append("name = ?")
        params.append(data["name"])
    if "description" in data:
        updates.append("description = ?")
        params.append(data["description"])
    if "date_due" in data:
        updates.append("date_due = ?")
        date_due = data["date_due"]
        if ' ' in date_due:
            date_due = date_due.split(' ')[0]  # Extract only the date portion
        params.append(date_due)
    if "progress" in data:
        updates.append("progress = ?")
        params.append(data["progress"])
    params.append(task_id)
    sql = f"UPDATE Tasks SET {', '.join(updates)} WHERE id = ?"
    cursor.execute(sql, params)
    conn.commit()
    if cursor.rowcount == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Task updated successfully"}), 200


# @app.route('/assign_task', methods=["POST"])
# @login_required(role='manager')
# def assign_task():
#     data = request.json
#     task_id = data.get("task_id")
#     employee_id = data.get("employee_id")
    
#     conn = connect_to_db()
#     cursor = conn.cursor()
    
#     try:
#         # Insert a new record into the TaskAssignments table
#         cursor.execute('INSERT INTO TaskAssignments (task_id, employee_id) VALUES (?, ?)', (task_id, employee_id))
#         conn.commit()

#         return jsonify({"message": "Task successfully assigned to the employee"}), 200

#     except sqlite3.Error as e:
#         return jsonify({"error": str(e)}), 400

#     finally:
#         conn.close()


@app.route('/assign_task', methods=["POST"])
@login_required(role='manager')
def assign_task():
    data = request.json
    task_id = data.get("task_id")
    employee_id = data.get("employee_id")
    
    conn = connect_to_db()
    cursor = conn.cursor()
    
    try:
        # Insert a new record into the TaskAssignments table
        cursor.execute('INSERT INTO TaskAssignments (task_id, employee_id) VALUES (?, ?)', (task_id, employee_id))
        conn.commit()

        # Retrieve the employee's email address
        cursor.execute('SELECT email FROM Employees WHERE id = ?', (employee_id,))
        employee_email = cursor.fetchone()[0]

        # Retrieve the task name
        cursor.execute('SELECT name FROM Tasks WHERE id = ?', (task_id,))
        task_name = cursor.fetchone()[0]

        # Compose the email message
        message = MIMEMultipart()
        message['From'] = EMAIL_ADDRESS
        message['To'] = employee_email
        message['Subject'] = 'New Task Assigned'
        body = f'You have been assigned a new task: {task_name}'
        message.attach(MIMEText(body, 'plain'))

        # Send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(message)

        return jsonify({"message": "Task successfully assigned to the employee"}), 200

    except sqlite3.Error as e:
        print(f"SQLite3 Error: {str(e)}")
        return jsonify({"error": str(e)}), 400

    except smtplib.SMTPException as e:
        print(f"SMTP Exception: {str(e)}")
        return jsonify({"error": "Failed to send email to the employee"}), 500

    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

    finally:
        conn.close()

@app.route('/employee_tasks', methods=["GET"])
@login_required(role='employee')
def get_employee_tasks():
    employee_id = request.user_id
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT 
            t.id, t.name, t.description, t.date_due, t.progress
        FROM Tasks t
        JOIN TaskAssignments ta ON t.id = ta.task_id
        WHERE ta.employee_id = ?
    ''', (employee_id,))
    tasks = cursor.fetchall()
    tasks_list = [{
        "id": task[0], "name": task[1], "description": task[2], "date_due": task[3], "progress": task[4]
    } for task in tasks]
    conn.close()
    return jsonify(tasks_list), 200

@app.route('/update_task_progress', methods=["PATCH"])
@login_required(role='employee')
def update_task_progress():
    data = request.json
    task_id = data.get("task_id")
    progress = data.get("progress")

    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('UPDATE Tasks SET progress = ? WHERE id = ?', (progress, task_id))
        conn.commit()
        return jsonify({"message": "Task progress updated successfully"}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()



#login route

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username and password match the hardcoded manager
    if username == 'maurice' and password == '12345':
        token = generate_token(user_id=1, role='manager')
        return jsonify({'token': token}), 200

    # Check if the username and password match any user in the database
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute('SELECT id, password, role FROM Employees WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user[1], password):
        token = generate_token(user_id=user[0], role=user[2])
        return jsonify({'token': token, 'employeeId': user[0]}), 200 # Return the employee ID
    else:
        return jsonify({'error': 'Invalid credentials'}), 401
    


@app.route('/change_password', methods=['PATCH'])
@login_required(role=None)
def change_password():
    data = request.json
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if request.user_role == 'manager' and request.user_id == 1:
        if old_password != '12345':
            return jsonify({'error': 'Invalid old password'}), 400
        else:
            # Update the hardcoded password for the manager
            manager_password = generate_password_hash(new_password)
            return jsonify({'message': 'Password changed successfully'}), 200
    else:
        conn = connect_to_db()
        cursor = conn.cursor()

        cursor.execute('SELECT password FROM Employees WHERE id = ?', (request.user_id,))
        user = cursor.fetchone()

        if user and check_password_hash(user[0], old_password):
            hashed_password = generate_password_hash(new_password)
            cursor.execute('UPDATE Employees SET password = ? WHERE id = ?', (hashed_password, request.user_id))
            conn.commit()
            conn.close()
            return jsonify({'message': 'Password changed successfully'}), 200
        else:
            conn.close()
            return jsonify({'error': 'Invalid old password'}), 400



@app.route('/send_broadcast_message', methods=["POST"])
@login_required(role='manager')
def send_broadcast_message():
    data = request.json
    sender = data.get("sender")
    content = data.get("content")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO Messages (sender, content, timestamp)
            VALUES (?, ?, ?);
        ''', (sender, content, timestamp))
        conn.commit()
        return jsonify({"message": "Broadcast message sent successfully"}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/get_broadcast_messages', methods=["GET"])
@login_required(role=None)
def get_broadcast_messages():
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            SELECT sender, content, timestamp FROM Messages
            ORDER BY timestamp DESC;
        ''')
        messages = cursor.fetchall()
        messages_list = [
            {"sender": message[0], "content": message[1], "timestamp": message[2]}
            for message in messages
        ]
        return jsonify(messages_list), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


@app.route('/search_employees', methods=["GET"])
@login_required(role='manager')
def search_employees():
    query = request.args.get('query')
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Employees WHERE username LIKE ?", (f'%{query}%',))
    employees = cursor.fetchall()
    employees_list = [{
        "id": emp[0], "username": emp[1], "email": emp[3],
        "gender": emp[4], "phone": emp[5], "role": emp[6], "profession": emp[7]
    } for emp in employees]
    conn.close()
    return jsonify(employees_list), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)



#DID TESTING ON THIS ALL IS GOOD SO FAR
# MORE TESTING IS DONE HERE NEED TO ADD LAST FEATURES
# TRY TO ADD FOR SLIDING for progress
# need to fix input validations 
# final touch ups including the search for employee based on name and the sorting of tasks 
# send broadcast fixed  code  
# double checking all the functions again
# backend is all good !