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

    #seller1, sellerId 4
    product11 = Product(
        title = 'Sony ZV-1 Camera', condition="New", price = 526, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/TScAAOSwxbFlFWCe/s-l1600.jpg',
        description = 'Featuring a side flip-out 3.0" touchscreen and a directional 3-capsule microphone that are perfect for front-facing recording, the ZV-1 also caters to this crowd with the Product Showcase Setting'
    )
    product12 = Product(
        title = 'Xbox Series X', condition="New", price = 539, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/17cAAOSwuFdlepvi/s-l960.jpg',
        description = 'Xbox Series X 1TB SSD Console Introducing the all new Xbox Series X Introducing Xbox Series X, the fastest, most powerful Xbox ever.'
     )
    product13 = Product(
        title = 'Harman Kardon Aura Studio 3 ', condition="New", price = 149, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/9l0AAOSwMWNlbkZt/s-l960.png',
        description = 'Elevate your home with the timeless, iconic design of the Harman Kardon Aura Studio 3 for 360 degrees of beautiful sound.'
     )
    product14 = Product(
        title = 'AKG N5005', condition="New", price = 199, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/pdMAAOSwDeVlaYLv/s-l960.png',
        description = 'Meticulously crafted from premium gloss black ceramic, the AKG N5005 is the epitome of pure and detailed studio sound reproduction, without distortion or distraction.'
     )
    product15 = Product(
        title = 'Harman Kardon Onyx Studio 7', condition="New", price = 89, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/u34AAOSw7bxkoV3p/s-l1600.jpg',
        description = 'Immerse yourself in the rhythm of life with unrivalled acoustic precision. Elegantly crafted, the Harman Kardon Onyx Studio 7 offers dual tweeters for beautiful stereo performance and a sleek anodized aluminum handle for ease of portability.'
    )

    product16 = Product(
        title = 'PlayStation 5', condition="New", price = 489, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/jpsAAOSwVZVlb17M/s-l960.jpg',
        description = 'PlayStation 5 Console. Marvels Spider-Man 2 Bundle includes: · PlayStation 5 console · DualSense wireless controller · Base · HDMI cable · AC power cord · USB cable · Printed materials · ASTROs PLAYROOM (Pre-installed game. PS5 console may need to be updated to the latest system software version. Internet connection required.)'
    )
    product17 = Product(
        title = 'NEW Nintendo Switch OLED', condition="New", price = 324, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/CugAAOSwcF1lixYw/s-l1600.jpg',
        description = 'NEW Nintendo Switch OLED 64GB White + 2in1 Wheel of Fortune & Jeopardy Game'
    )
    product18 = Product(
        title = 'NEW Nintendo Switch OLED Mario Limited Edition', condition="New", price = 316, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/g2oAAOSwaW5lVlfc/s-l1600.jpg',
        description = 'Nintendo Switch OLED Mario Limited Edition Mario + Rabbids Sparks of Hope Bundle'
    )
    product19 = Product(
        title = 'Marvel\'s Spider-Man: Miles Morales Ultimate Edition', condition="New", price = 54, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/lwkAAOSwuz9lns5h/s-l1600.jpg',
        description = 'The rise of Miles Morales Miles Morales discovers explosive powers that set him apart from his mentor, Peter Parker.'
    )
    product20 = Product(
        title = 'SteelSeries Arctis Nova Pro', condition="New", price = 268, sellerId = 4,
        image = 'https://i.ebayimg.com/images/g/VtcAAOSwD2FknCR6/s-l1600.jpg',
        description = 'The Arctis Nova Pro Wireless for Xbox raises the bar for audio headsets with the Nova Pro Acoustic System, immersive 360° Spatial Audio, Sonar Software, Active Noise Cancellation, and a dual-battery system.'
    )

    #need more seed data
    #create another user/users that will store all the products


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

    #seller1
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
