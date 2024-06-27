from app.models.models import db, WatchList, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_watchlist():
    print("INSIDE SEED WATCHLIST")
    #product1
    watchlist1 = WatchList (
        userId = 1, productId = 1
    )
    watchlist2 = WatchList (
        userId = 5, productId = 10
    )
    db.session.add(watchlist1)
    db.session.add(watchlist2)
    #
    db.session.commit()



def undo_watchlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist"))

    db.session.commit()
