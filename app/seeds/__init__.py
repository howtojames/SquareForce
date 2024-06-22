from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .cart_products import seed_cart_products, undo_cart_products
from .reviews import seed_reviews, undo_reviews
from .watchlist import seed_watchlist, undo_watchlist
from .user_address import seed_user_address, undo_user_address

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == False:
        print("SEED debug false")
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_user_address()
        undo_watchlist()
        undo_reviews()
        undo_cart_products()
        undo_products()
        undo_users()
    # Add other seed functions here
    print("SEED debug true")
    seed_users()
    seed_products()
    seed_cart_products()
    seed_reviews()
    seed_watchlist()
    seed_user_address()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_user_address()
    undo_watchlist()
    undo_reviews()
    undo_cart_products()
    undo_products()
    undo_users()
