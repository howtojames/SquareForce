from app.models.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_products():
    print("INSIDE SEED PRODUCTS")
    #demo user's products
    product1 = Product(
        title = 'keyboard', condition="New", price = 80, sellerId = 1,
        description = 'description'
    )
    product2 = Product(
        title = 'laptop', condition="New", price = 500, sellerId = 1,
        description = 'description'
    )
    product3 = Product(
        title = 'mouse', condition="Used - Like New", price = 50, sellerId = 1,
        description = 'description'
    )
    product4 = Product(
        title = 'Samsung Galaxy S10', condition="New", price = 139, sellerId = 1,
        description = 'description'
    )
    product5 = Product(
        title = 'Apple Watch Series 5', condition="New", price = 149, sellerId = 1,
        description = 'description'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
