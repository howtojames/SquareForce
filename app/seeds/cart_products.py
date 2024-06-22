from app.models.models import db, CartProduct, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_cart_products():
    print("INSIDE SEED CART PRODUCTS")

    #james
    cart_product1 = CartProduct(
        quantity = 1, productId = 10, buyerId = 5
    )
    cart_product2 = CartProduct(
        quantity = 1, productId = 9, buyerId = 5
    )

    #demo
    cart_product3 = CartProduct(
        quantity = 1, productId = 9, buyerId = 1
    )

    db.session.add(cart_product1)
    db.session.add(cart_product2)
    db.session.add(cart_product3)

    db.session.commit()


def undo_cart_products():
    if environment == False:
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_products"))

    db.session.commit()
