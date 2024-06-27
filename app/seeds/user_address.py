from app.models import db, User_Address, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_user_address():
    print("INSIDE SEED USER ADDRESS")

    demo_address = User_Address (
        address="123 Main Street", city="San Francisco", state="CA", country="USA"
    )

    marnie_address = User_Address (
        address="123 1st Street", city="San Francisco", state="CA", country="USA"
    )

    bobbie_address = User_Address (
        address="231 Bay Street", city="San Francisco", state="CA", country="USA"
    )


    seller1_address = User_Address (
        address="123 Broadway", city="San Francisco", state="CA", country="USA"
    )
    james_address = User_Address (
        address="123 Pine Stret", city="San Francisco", state="CA", country="USA"
    )

    test_address = User_Address (
        address="123 Pine Stret", city="San Francisco", state="CA", country="USA"
    )


    db.session.add(demo_address)
    db.session.add(marnie_address)
    db.session.add(bobbie_address)

    db.session.add(seller1_address)
    db.session.add(james_address)

    #
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_address():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_addresses"))

    db.session.commit()
