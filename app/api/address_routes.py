from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Product, CartProduct, User, Review
from ..forms.review_form import ReviewForm
from flask_login import login_required, current_user
from datetime import datetime


@user_routes.route('/<int:id>/address')
@login_required
def user_address(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    user = User.query.get(id)
    print("user HERRE", user)

    def __self__():
        user = user
        address = user

    return user.address.to_dict()
