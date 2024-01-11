from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User
from ..forms.cart_product_form import CartProductForm
from flask_login import login_required, current_user
from datetime import datetime


cart_product_routes = Blueprint('cart_products', __name__)

#gets current user's products
@cart_product_routes.route('/current')
def get_current_user_cart_products():
    userId = current_user.id

    #products = Product.query.filter_by()
    cart_products =  CartProduct.query.filter_by(buyerId=userId).all()

    cart_product_data = [cart_product.to_dict() for cart_product in cart_products]
    print("cart_product_data", cart_product_data)
    return jsonify(cart_product_data)


@cart_product_routes.route('/<int:id>', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_cart_product(id):
    form = CartProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(1)
    #query
    print("id in route", id)
    cart_product = CartProduct.query.filter_by(productId = id).first()
    print("cart_product", cart_product)
    print(2)

    if not cart_product:
        print(3)
        new_cart_product = CartProduct (
            quantity = form.data["quantity"],
            productId = id,
            buyerId = current_user.id
        )
        print("new_cart_product", new_cart_product)
        db.session.add(new_cart_product)
        db.session.commit()
        return new_cart_product.to_dict()
    else:
        return jsonify("Cart Product already exists")




@cart_product_routes.route('<int:id>', methods=['DELETE'])
def remove_cart_product(id):
    cart_product = CartProduct.query.get(id)

    if cart_product:
        db.session.delete(cart_product)
        db.session.commit()
        return jsonify({'message': 'Cart Product removed successfully'})
    else:
        print("Cart Product does not exist")

    return jsonify({'message': 'Cart Product not found'})
