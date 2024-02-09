from app.models.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    print("INSIDE SEED REVIEWS")
    #product1
    review1 = Review (
        buyerId = 1, productId = 1, stars = 5,
        review = "I've been using the Microsoft Surface Pro 8 for a few weeks now, and I'm thoroughly impressed. The Intel Core i7 processor coupled with 16GB of RAM ensures seamless multitasking, whether I'm working on documents or editing photos. The 13-inch PixelSense™ display is incredibly sharp and vibrant, making movies and videos a joy to watch. The battery life is excellent, easily lasting me through a full day of work. The versatility of this device, with its ability to switch between laptop and tablet mode, is a game-changer. Overall, I highly recommend the Surface Pro 8 for anyone in need of a powerful and portable device."
    )
    review2 = Review (
        buyerId = 2, productId = 1, stars = 4,
        review = "The Microsoft Surface Pro 8 is a sleek and versatile device that exceeds expectations. The Intel Core i5 processor and 8GB of RAM provide snappy performance for everyday tasks, and the 13-inch PixelSense™ display is stunningly crisp and clear. I appreciate the lightweight design and the ability to use the Surface Pen for note-taking and sketching. Battery life is impressive, easily lasting me through a full day of classes or meetings. While the price may be a bit steep, the Surface Pro 8 offers unmatched versatility and performance in a portable package."
    )
    review3 = Review (
        buyerId = 3, productId = 1, stars = 5,
        review = "As a frequent traveler, the Microsoft Surface Pro 8 has become an indispensable tool for me. Its lightweight design and compact form factor make it easy to slip into my bag, yet it packs enough power to handle all my work tasks on the go. The Intel Core i3 processor and 4GB of RAM may not be the most powerful configuration, but they're sufficient for my needs, and the 128GB SSD offers ample storage for essential files. The 13-inch PixelSense™ display is vibrant and responsive, perfect for both work and entertainment. Overall, the Surface Pro 8 is the perfect travel companion for professionals who need performance without sacrificing portability."
    )
    #product2
    review4 = Review (
        buyerId = 1, productId = 2, stars = 5,
        review = "The Acer Aspire 3 is a solid budget laptop that gets the job done. Its AMD Ryzen 5 processor and 8GB of RAM provide enough power for everyday tasks like web browsing, streaming, and light productivity work. The 15.6-inch display is bright and clear, though the viewing angles could be better. The build quality feels sturdy, and I appreciate the inclusion of a full-sized keyboard with a numeric keypad. Battery life is decent, lasting around 6-7 hours with moderate usage. Overall, the Acer Aspire 3 offers good value for the price and is suitable for students or casual users on a budget."
    )
    review5 = Review (
        buyerId = 2, productId = 2, stars = 4,
        review = "I've been using the Acer Aspire 3 for a few months now, and I'm quite satisfied with its performance. The Intel Core i3 processor and 4GB of RAM may not be the most powerful, but they handle basic tasks like web browsing, email, and word processing without any issues. The 15.6-inch display is adequate for everyday use, though the colors can appear slightly washed out. I appreciate the lightweight design and the inclusion of multiple ports for connectivity. Battery life is average, lasting around 4-5 hours on a single charge. Overall, the Acer Aspire 3 is a decent budget laptop for those with simple computing needs."
    )

    #product3
    review6 = Review (
        buyerId = 1, productId = 3, stars = 5,
        review = "The Lenovo Legion 5 is an absolute powerhouse of a gaming laptop. Equipped with an AMD Ryzen 7 processor and 16GB of RAM, it handles even the most demanding games with ease. The NVIDIA GeForce RTX 3060 graphics card delivers stunning visuals, while the 15.6-inch Full HD display offers crisp and smooth gameplay. The keyboard is comfortable for long gaming sessions, with customizable RGB lighting adding a touch of style. The build quality is solid, with a sleek and understated design that belies its gaming prowess. Battery life is decent for a gaming laptop, lasting around 5-6 hours with moderate usage. Overall, the Lenovo Legion 5 is a fantastic choice for gamers who want top-tier performance without breaking the bank."
    )

    #vision pro, productId 10
    review7 = Review (
        buyerId = 3, productId = 10, stars = 5,
        review = "The Apple Vision Pro sets a new benchmark for augmented reality experiences with its sleek design and advanced features. This AR headset offers a comfortable fit and precise tracking, allowing users to seamlessly integrate digital content into their surroundings. The high-resolution displays provide crisp visuals, immersing users in virtual experiences with stunning clarity. With its built-in sensors and cameras, the Vision Pro enables precise interaction with virtual objects, opening up new possibilities for gaming, productivity, and more. While the ecosystem is still evolving, the Apple Vision Pro is a testament to Apple's commitment to pushing the boundaries of innovation in AR technology."
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)

    db.session.commit()



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
