from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    print("INSIDE SEED USERS")

    users = [
        User(username='Demo', email='demo@aa.io', hashed_password='hashed_password', address=None, city=None, state=None, country=None),
        User(username='marnie', email='marnie@aa.io', hashed_password='hashed_password', address=None, city=None, state=None, country=None),
        User(username='bobbie', email='bobbie@aa.io', hashed_password='hashed_password', address=None, city=None, state=None, country=None),
        User(username='seller1', email='seller1@gmail.com', hashed_password='hashed_password', address=None, city=None, state=None, country=None),
        User(username='jruan', email='jruan@gmail.com', hashed_password='hashed_password', address=None, city=None, state=None, country=None)
    ]

    for user in users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
