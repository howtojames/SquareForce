from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User, WatchList
#from ..forms.review_form import ReviewForm
from flask_login import login_required, current_user
from datetime import datetime

watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/current')
def get_watchlist_products():

    watchlist_products =  WatchList.query.filter_by(userId=current_user.id).all()

    #if user watchlist_products is empty, we return a empty array
    if not watchlist_products:
        return jsonify([])

    watchlist_products_data = [watchlist_products.to_dict() for watchlist_products in watchlist_products]
    #print("watchlist_products_data", watchlist_products_data)
    return jsonify(watchlist_products_data)


#post a watchlist product using productId
@watchlist_routes.route('/<int:id>', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_watchlist_product(id):
    #checks buyer/user already has a watchlist_product
    #WatchList has userId and productId
    watchlist_product = WatchList.query.filter_by(userId = current_user.id, productId = id).first()

    #if this product_review does not exist, we make a new product_review
    if not watchlist_product:
        new_watchlist_product = WatchList (
            userId = current_user.id,
            productId = id
        )
        #print("new_watchlist_product", new_watchlist_product)
        db.session.add(new_watchlist_product)
        db.session.commit()
        return new_watchlist_product.to_dict()
    else:
        print("User already has a WatchList Product")
        return jsonify(error="User already has a WatchList Product")


#delete a watchlist product
@watchlist_routes.route('<int:id>', methods=['DELETE'])
def remove_watchlist_product(id):
    watchlist_product = WatchList.query.get(id)

    if watchlist_product:
        db.session.delete(watchlist_product)
        db.session.commit()
        return jsonify({'message': 'WatchList Product removed successfully'})
    else:
        print("WatchList Product does not exist")

    return jsonify({'message': 'WatchList Product not found'})
