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
    #print("cart_product_data", cart_product_data)
    return jsonify(cart_product_data)


#id - productId being passed from the frontend
@cart_product_routes.route('/<int:id>', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_cart_product(id):
    form = CartProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #what do we want to get here???
    #answer: ..
    #what do we want to do after?
    #answer:
    cart_product = CartProduct.query.filter_by(buyerId = current_user.id, productId = id).first()

    #if this cart_product does not exist, we make a new cart_product
    if not cart_product:
        new_cart_product = CartProduct (
            quantity = form.data["quantity"],
            productId = id,
            buyerId = current_user.id
        )
        #print("new_cart_product", new_cart_product)
        db.session.add(new_cart_product)
        db.session.commit()
        return new_cart_product.to_dict()
    else:
        return jsonify(error="CartProduct already exists")

#we use cartProductId here to query for the cartProduct we want to edit
@cart_product_routes.route("/update/<int:cart_product_id>", methods=["PUT"])
@login_required
def update_cart_product(cart_product_id):
    cart_product = CartProduct.query.get(cart_product_id)
    #print("cart_product", cart_product.to_dict())

    #error handling
    if not cart_product: return "CartProduct does not exist"

    form = CartProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart_product.quantity = form.data["quantity"]

        db.session.commit()
        return cart_product.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"




@cart_product_routes.route('<int:cart_product_id>', methods=['DELETE'])
def remove_cart_product(cart_product_id):
    cart_product = CartProduct.query.get(cart_product_id)

    if cart_product:
        db.session.delete(cart_product)
        db.session.commit()
        return jsonify({'message': 'Cart Product removed successfully'})
    else:
        print("Cart Product does not exist")

    return jsonify({'message': 'Cart Product not found'})
