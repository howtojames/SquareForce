from app.models.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_products():
    print("INSIDE SEED PRODUCTS")
    #demo user's products
    product1 = Product(
        title = 'keyboard', condition="New", price = 80, sellerId = 1,
        image = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        description = 'description'
    )
    product2 = Product(
        title = 'laptop', condition="New", price = 500, sellerId = 1,
        image = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        description = 'description'
    )
    product3 = Product(
        title = 'mouse', condition="Used - Like New", price = 50, sellerId = 1,
        image = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        description = 'description'
    )
    product4 = Product(
        title = 'Samsung Galaxy S10', condition="New", price = 139, sellerId = 1,
        image = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        description = 'description'
    )
    product5 = Product(
        title = 'Apple Watch Series 5', condition="New", price = 149, sellerId = 1,
        image = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        description = 'description'
    )

    #james
    product6 = Product(
        title = 'iPhone 15', condition="New", price = 149, sellerId = 5,
        image = 'https://m.media-amazon.com/images/I/612mSuve9bL._AC_SX679_.jpg',
        description = 'description'
    )
    product7 = Product(
        title = 'iPhone 15 Pro', condition="New", price = 149, sellerId = 5,
        image = 'https://m.media-amazon.com/images/I/71hDhuRKjqL._AC_SX679_.jpg',
        description = 'description'
    )
    product8 = Product(
        title = 'MacBook Air M2', condition="New", price = 149, sellerId = 5,
        image = 'https://m.media-amazon.com/images/I/81Fm0tRFdHL._AC_SX679_.jpg',
        description = 'description'
    )
    product9 = Product(
        title = 'Airpods 3rd Generation', condition="New", price = 149, sellerId = 5,
        image = 'https://target.scene7.com/is/image/Target/GUEST_184c4d30-7abd-4a8d-a61f-dd853f04804a?wid=800&hei=800&qlt=80&fmt=webp',
        description = 'description'
    )
    product10 = Product(
        title = 'Vision Pro', condition="New", price = 149, sellerId = 5,
        image = 'https://www.gameinformer.com/sites/default/files/styles/full/public/2024/01/08/a29950a8/apple_vision_pro_release_date_february.jpg',
        description = 'description'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)

    #james
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
