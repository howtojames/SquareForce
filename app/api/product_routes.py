from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_all_products():
    products_list = Product.query.order_by(Product.id.desc()).all()

    #create new list
    products = []
    for product in products_list:
        product_data = product.to_dict()
        products.append(product_data)

    return jsonify(products)


@product_routes.route('/<int:id>')
def get_single_product(id):

    product = Product.query.get(id)
    product_data = product.to_dict()

    return jsonify(product_data)
