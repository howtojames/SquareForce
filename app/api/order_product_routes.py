from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User, Order, OrderProduct
from ..forms.order_product_form import OrderProductForm
from flask_login import login_required, current_user
from datetime import datetime

order_product_routes = Blueprint('order_products', __name__)


#gets current user's products
@order_product_routes.route('/current')
def get_current_user_order_products():
    order_products =  OrderProduct.query.filter_by(buyerId=current_user.id).all()

    order_products = [order_product.to_dict() for order_product in order_products]
    #print("order_products", order_products)
    return jsonify(order_products)


#post a order
@order_product_routes.route('/new', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_order_product():
    form = OrderProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    new_order_product = OrderProduct (
        quantity = form.data["quantity"],
        orderId = form.data["orderId"],
        productId = form.data["productId"],
        buyerId = current_user.id
    )

    db.session.add(new_order_product)
    db.session.commit()

    #print("new_order_product", new_order_product.to_dict())
    return new_order_product.to_dict()
