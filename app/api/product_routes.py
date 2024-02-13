from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, User
from ..forms.product_form import ProductForm
from flask_login import login_required, current_user
from datetime import datetime

#aws s3, directly from recording
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename



product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_all_products():

    products_list = Product.query.order_by(Product.id.desc()).all()
    #print("products_list", products_list)
    #create new list
    products = []
    for product in products_list:
        product_data = product.to_dict()
        #print("product_data", product_data)
        products.append(product_data)

    #returns list of product objects
    return jsonify(products)


@product_routes.route('/<int:id>')
def get_single_product(id):

    product = Product.query.get(id)
    product_data = product.to_dict()

    return jsonify(product_data)

#gets current user's products
@product_routes.route('/current')
def get_current_user_products():
    userId = current_user.id

    user = User.query.get(userId)
    products =  Product.query.filter_by(sellerId=userId).all()

    user_data = user.to_dict()
    product_data = [product.to_dict() for product in products]
    #print( product_data, user_data)
    return jsonify(products = product_data)


@product_routes.route("/new", methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_product():

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #print("current_user.id ***", current_user.id)

    #aws s3
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("upload", upload)

    if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when you tried to upload
    # so you send back that error message (and you printed it above)
        return { "error": "url not in upload" }

    if form.validate_on_submit():
        new_product = Product (
            title = form.data["title"],
            condition = form.data["condition"],
            price = form.data["price"],
            image = upload['url'],   #"url" in upload
            description = form.data["description"],
            sellerId = current_user.id,

            #category = form.data["category"]
        )
        #print("new_product", new_product)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"


@product_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
    product = Product.query.get(id)
    #print("product", product.to_dict())

    #error handling
    if not product: return "Product does not exist"

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #aws s3
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("upload", upload)

    if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when you tried to upload
    # so you send back that error message (and you printed it above)
        return { "error": "url not in upload" }

    if form.validate_on_submit():
        product.title = form.data["title"]
        product.condition = form.data["condition"]
        product.price = form.data["price"]
        product.image = upload['url']   #"url" in upload
        product.description = form.data["description"]
        product.sellerId = current_user.id

        db.session.commit()
        return product.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"


@product_routes.route('<int:id>', methods=['DELETE'])
def remove_product(id):
    product = Product.query.get(id)
    #remove associated items

    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product removed successfully'})
    else:
        print("Product does not exist")

    return jsonify({'message': 'Product not found'})
