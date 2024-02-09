from app.models.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    print("INSIDE SEED REVIEWS")
    #product1
    review1 = Review (
        buyerId = 1, productId = 1, stars = 5,
        review = 'I have been using the Microsoft Surface Pro 8 for a few weeks now, and I am thoroughly impressed.'
    )
    review2 = Review (
        buyerId = 2, productId = 1, stars = 4,
        review = 'The Microsoft Surface Pro 8 is a sleek and versatile device that exceeds expectations.'
    )
    review3 = Review (
        buyerId = 3, productId = 1, stars = 5,
        review = 'As a frequent traveler, the Microsoft Surface Pro 8 has become an indispensable tool for me.'
    )
    #product2
    review4 = Review (
        buyerId = 1, productId = 2, stars = 5,
        review = 'The Acer Aspire 3 is a solid budget laptop that gets the job done.'
    )
    review5 = Review (
        buyerId = 2, productId = 2, stars = 4,
        review = 'I have been using the Acer Aspire 3 for a few months now, and I am quite satisfied with its performance.'
    )

    #product3
    review6 = Review (
        buyerId = 1, productId = 3, stars = 5,
        review = 'The Lenovo Legion 5 is an absolute powerhouse of a gaming laptop.'
    )

    #vision pro, productId 10
    review7 = Review (
        buyerId = 3, productId = 10, stars = 5,
        review = 'The Apple Vision Pro sets a new benchmark for augmented reality experiences with its sleek design and advanced features.'
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
