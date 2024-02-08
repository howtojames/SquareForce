from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User, Review
from ..forms.review_form import ReviewForm
from flask_login import login_required, current_user
from datetime import datetime


review_routes = Blueprint('reviews', __name__)

#loads current product's reviews
@review_routes.route('/<int:id>')
def get_product_reviews(id):
    #Review has productId
    product_reviews =  Review.query.filter_by(productId=id).all()

    #if product reviews is empty, we return a empty array
    if not product_reviews:
        return jsonify([])

    product_reviews_data = [product_reviews.to_dict() for product_reviews in product_reviews]
    print("product_reviews_data", product_reviews_data)
    return jsonify(product_reviews_data)


#post a review on a product
@review_routes.route('/<int:id>', methods=["POST"])
@login_required  #will throw 401 if not logged in
def post_product_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #checks buyer/user already has a review, return Review already exists
    #Review has buyerId and productId
    product_review = Review.query.filter_by(buyerId = current_user.id, productId = id).first()

    #if this product_review does not exist, we make a new product_review
    if not product_review:
        new_product_review = Review (
            review = form.data["review"],
            stars = form.data["stars"],
            productId = id,
            buyerId = current_user.id
        )
        print("new_product_review", new_product_review)
        db.session.add(new_product_review)
        db.session.commit()
        return new_product_review.to_dict()
    else:
        return jsonify(error="User already has a Review")



#delete a review on a product
@review_routes.route('<int:id>', methods=['DELETE'])
def remove_product_review(id):
    product_review = Review.query.get(id)

    if product_review:
        db.session.delete(product_review)
        db.session.commit()
        return jsonify({'message': 'Product Review removed successfully'})
    else:
        print("Product Review Product does not exist")

    return jsonify({'message': 'Product Review Product not found'})
