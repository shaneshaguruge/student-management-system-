import sqlite3
import os
from contextlib import closing

# Database location
DB_PATH = os.path.join(os.path.dirname(__file__), "students.db")


# Database connection
def get_connection():
    return sqlite3.connect(DB_PATH)


# Create table
def create_table():
    with closing(get_connection()) as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL
            )
        """)
        connection.commit()


# Add Student
def add_student(name, age):
    with closing(get_connection()) as connection:
        connection.execute(
            "INSERT INTO students (name, age) VALUES (?, ?)",
            (name, age)
        )
        connection.commit()


# View Students
def view_students():
    with closing(get_connection()) as connection:
        cursor = connection.execute(
            "SELECT * FROM students"
        )
        return cursor.fetchall()


# Search Student
def search_student(student_id):
    with closing(get_connection()) as connection:
        cursor = connection.execute(
            "SELECT * FROM students WHERE id = ?",
            (student_id,)
        )
        return cursor.fetchone()


# Update Student
def update_student(student_id, name, age):
    with closing(get_connection()) as connection:
        cursor = connection.execute(
            "UPDATE students SET name = ?, age = ? WHERE id = ?",
            (name, age, student_id)
        )
        connection.commit()
        return cursor.rowcount > 0


# Delete Student
def delete_student(student_id):
    with closing(get_connection()) as connection:
        cursor = connection.execute(
            "DELETE FROM students WHERE id = ?",
            (student_id,)
        )
        connection.commit()
        return cursor.rowcount > 0