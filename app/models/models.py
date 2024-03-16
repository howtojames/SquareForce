from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime # added


#one User to many Products
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    #production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationship
    products = db.relationship("Product", back_populates="user")  #error here when db upgrade

    #relationship with Reviews
    reviews = db.relationship("Review", back_populates="user")

    #relationship with Watchlist
    watchlist = db.relationship("WatchList", back_populates="user")

    #relationship with Orders
    orders = db.relationship("Order", back_populates="user")





    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        #review is a InstrumentedList
        #reviews_dict = [review.to_dict() for review in self.reviews]
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

#price to decimal
class Product(db.Model):
    __tablename__ = "products"

    #production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    condition = db.Column(db.String, nullable=False)
    #change
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    #category = db.Column(db.String, nullable=False)
    #indicated one User to many Products
    sellerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    #relationship with User
    user = db.relationship("User", back_populates="products")
    #relationship with CartProducts
    cart_products = db.relationship("CartProduct", back_populates="products")

    order_products = db.relationship("OrderProduct", back_populates="products")

    #relationship with Review
    reviews = db.relationship("Review", back_populates="products")

    #relationship with WatchList
    watchlist = db.relationship("WatchList", back_populates="products")



    def to_dict(self):
        #self.reviews is a InstrumentedList, cannot call to_dict() directly
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'condition': self.condition, #add description
            'image': self.image,
            'description': self.description,
            'sellerId': self.sellerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }


class CartProduct(db.Model):
    __tablename__ = "cart_products"

    #production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    #indicate one Product to many CartProduct
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    #indicate one User to many CartProduct
    buyerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    #relationship with Product
    products = db.relationship("Product", back_populates="cart_products")


    def to_dict(self):
        return {
            'id': self.id,
            'product': self.products.to_dict(),
            'quantity': self.quantity,
            'productId': self.productId,
            'buyerId': self.buyerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    #indicate one Product to many Reviews
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    #indicate one User to many CartProduct
    buyerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    #relationship with User
    user = db.relationship("User", back_populates="reviews")
    #relationship with Product
    products = db.relationship("Product", back_populates="reviews")

    #we wan to get the user associated to that review
    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'review': self.review,
            'stars': self.stars,
            'productId': self.productId,
            'buyerId': self.buyerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }




class WatchList(db.Model):
    __tablename__ = "watchlist"

    #production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #indicate one Product to many WatchList items
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    #indicate one User to many WatchList items
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())


    #relationship with User
    user = db.relationship("User", back_populates="watchlist")
    #relationship with Product
    products = db.relationship("Product", back_populates="watchlist")



    def to_dict(self):
        return {
            'id': self.id,
            'product': self.products.to_dict(),
            'productId': self.productId,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }


class Order(db.Model):
    __tablename__ = "orders"

     #production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer, nullable=False)
    #indicates one User to many Order
    buyerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    #relationship with User
    user = db.relationship("User", back_populates="orders")

    #relationship with Order
    order_products = db.relationship("OrderProduct", back_populates="order")



    def to_dict(self):
        return {
            'id': self.id,
            'total': self.total,
            'buyerId': self.buyerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }


class OrderProduct(db.Model):
    __tablename__ = "order_products"


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    #indicate one Order to many OrderProduct
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")))
    #indicate one Product to many OrderProduct
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    #indicate one User to many OrderProduct
    buyerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    #relationship with Order
    order = db.relationship("Order", back_populates="order_products")

    #relationship with Product
    products = db.relationship("Product", back_populates="order_products")

    def to_dict(self):
        return {
            'id': self.id,
            'product': self.products.to_dict(),
            'quantity': self.quantity,
            'orderId': self.orderId,
            'productId': self.productId,
            'buyerId': self.buyerId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
