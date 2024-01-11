from app.models.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_products():
    print("INSIDE SEED PRODUCTS")
    #demo user
    product1 = Product(
        title = 'Microsoft Surface Pro 8 ', condition="New", price = 594, sellerId = 1,
        image = 'https://i.ebayimg.com/images/g/rmkAAOSwxZFlb14-/s-l960.jpg',
        description = 'Expect more from your computer Surface Pro 8 combines the power of a laptop with the flexibility of a tablet, and every angle in between, with the iconic Kickstand and larger 13” touchscreen'
    )
    product2 = Product(
        title = 'Acer Aspire 3', condition="New", price = 289, sellerId = 1,
        image = 'https://i.ebayimg.com/images/g/cGEAAOSwoftkmzvs/s-l960.jpg',
        description = 'The Acer Aspire 3 is a versatile 15.6-inch laptop powered by an AMD Ryzen 5 7520U processor running at 2.80GHz, making it suitable for various everyday computing tasks, from work to entertainment.'
    )
    product3 = Product(
        title = 'Lenovo Legion 5', condition="Used - Like New", price = 869, sellerId = 1,
        image = 'https://i.ebayimg.com/images/g/kO4AAOSw8~xlPArk/s-l960.jpg',
        description = 'Powerful Performance Experience exceptional computing with the AMD Ryzen 7 7735H CPU, providing impressive processing power for seamless multitasking, content creation, and gaming.'
    )
    product4 = Product(
        title = 'Apple iPad Pro 5th Gen', condition="New", price = 779, sellerId = 1,
        image = 'https://i.ebayimg.com/images/g/vigAAOSwMxJk-1gI/s-l960.jpg',
        description = 'Accelerometer, Ambient Light Sensor, Apple Pencil Support, Barometer, Built-In Front Camera, Built-In Rear Camera, Facial Recognition, LiDAR Scanner, Magic Keyboard Support'
    )
    product5 = Product(
        title = 'Lenovo Legion Pro', condition="New", price = 1469, sellerId = 1,
        image = 'https://i.ebayimg.com/images/g/SU4AAOSwfoNlb17d/s-l960.jpg',
        description = 'The World\'s Most Powerful AI Tuned Gaming Laptops AI-tuned via Lenovo AI Engine+ and LA AI chips to perform like never before, the Legion Pro 5i comes stocked with fully-powered 13th Gen Intel Core Processors, alongside 40 Series NVIDIA GeForce RTX Graphics for some seriously sweet performance.'
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

    #seller1
    # product11 = Product(
    #     title = 'Microsoft Surface Pro 8 ', condition="New", price = 594, sellerId = 1,
    #     image = 'https://i.ebayimg.com/images/g/rmkAAOSwxZFlb14-/s-l960.jpg',
    #     description = 'Expect more from your computer Surface Pro 8 combines the power of a laptop with the flexibility of a tablet, and every angle in between, with the iconic Kickstand and larger 13” touchscreen'
    # )

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
