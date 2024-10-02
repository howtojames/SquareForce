# from flask import Blueprint, jsonify, request
# from flask_login import current_user
# from ..models import db
# from ..models.models import User, User_Address
# from ..forms.review_form import ReviewForm
# from flask_login import login_required, current_user
# from datetime import datetime

# user_address_routes = Blueprint('user_addres_routes', __name__)

# @user_address_routes.route('/<int:id>')
# @login_required
# def user_address(id):
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     user = User.query.get(id)
#     address = User.query.filter(id = id).address
#     print("user HERRE", user)

#     def __self__():
#         user = user
#         address = address

#     return user.address.to_dict()
