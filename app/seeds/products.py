from app.models.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_products():
    print("INSIDE SEED PRODUCTS")
    #demo user's products
    product1 = Product(
        name = 'keyboard', price = 80, category='electronics', sellerId = 1
    )
    product2 = Product(
        name = 'laptop', price = 500, category='electronics', sellerId = 1
    )
    product3 = Product(
        name = 'mouse', price = 50, category='electronics', sellerId = 1
    )
    product4 = Product(
        name = 'Samsung Galaxy S10', price = 139, category='electronics', sellerId = 1
    )
    product5 = Product(
        name = 'Apple Watch Series 5', price = 149, category='electronics', sellerId = 1
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    print("before comitting")
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
