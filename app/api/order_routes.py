from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User, Order
from ..forms.order_form import OrderForm
from flask_login import login_required, current_user
from datetime import datetime


order_routes = Blueprint('orders', __name__)


#gets current user's products
@order_routes.route('/current')
def get_current_user_orders():
    orders =  Order.query.filter_by(buyerId=current_user.id).all()

    order_data = [order.to_dict() for order in orders]
    #print("order_data", order_data)
    return jsonify(order_data)



#post a order
@order_routes.route('/new', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_order():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    new_order = Order (
        total = form.data["total"],
        buyerId = current_user.id
    )

    db.session.add(new_order)
    db.session.commit()

    #print("new_order", new_order.to_dict())

    #new_order.cartProducts = cart_products_dict
    #print("new_order.to_dict() **************************", new_order.to_dict())
    return jsonify(order=new_order.to_dict())
