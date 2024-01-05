from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product
from ..forms.product_form import ProductForm
from flask_login import login_required, current_user
from datetime import datetime

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_all_products():

    products_list = Product.query.order_by(Product.id.desc()).all()
    print("products_list", products_list)
    #create new list
    products = []
    for product in products_list:
        product_data = product.to_dict()
        print("product_data", product_data)
        products.append(product_data)

    #returns list of product objects
    return jsonify(products)


@product_routes.route('/<int:id>')
def get_single_product(id):

    product = Product.query.get(id)
    product_data = product.to_dict()

    return jsonify(product_data)



@product_routes.route("/new", methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_question():

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product (
            name = form.data["name"],
            category = form.data["category"]
        )
        print("new_product", new_product)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"
