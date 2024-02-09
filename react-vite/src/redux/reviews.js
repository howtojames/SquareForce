const GET_PRODUCT_REVIEWS = "reviews/getProductReviews";
const GET_CURRENT_USER_REVIEWS = 'reviews/getCurrentUserReviews';
const POST_A_REVIEW = 'reviews/postAReview';
const DELETE_A_REVIEW = 'reviews/deleteAReview';


const getProductReviews = (productReviews) => {
    return {
      type: GET_PRODUCT_REVIEWS,
      productReviews
    }
}
const getCurrentUserReviews = (reviews) => {
  return {
    type: GET_CURRENT_USER_REVIEWS,
    reviews
  }
};

const postAReview = (review) => {
  return {
    type: POST_A_REVIEW,
    review
  };
};

const deleteAReview = (reviewId) => {
  return {
    type: DELETE_A_REVIEW,
    reviewId
  };
}


export const thunkGetProductReviews  = (productId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${productId}`);

    if(res.ok) {
      const productReviews = await res.json();
      console.log('productReviews in thunkGetProductReviews', productReviews);
      dispatch(getProductReviews(productReviews));
      return productReviews;
    } else  {
      const error = await res.json();
      console.log('error', error);
      return error;
    }
}
export const thunkGetCurrentUserReviews = () => async (dispatch) => {
  // URL: /api/reviews/current
  const res = await fetch(`/api/reviews/current`);  //fetch

  if(res.ok) {
    //{ Reviews: [ {}, {}, ...] }, food
    const reviews = await res.json();
    console.log('currentUserReviews in thunk', reviews);
    dispatch(getCurrentUserReviews(reviews));
    return reviews;
  } else  {
    console.log('/api/reviews/current error output');
  }
};
//we use productId here, to create a Review with the assotiated Product
//Review here contains { quantity: ... }
export const thunkPostAReview = (productId, review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if(res.ok) {
    const review = await res.json();
    console.log('review in thunkPostAReview', review);
    dispatch(postAReview(review));
    return review;
  } else  {
    const error = await res.json();
    console.log('thunkPostAProduct error message', error);
    return error;
  }
}


//we use ReviewId here to query for the Review we want to delete
export const thunkDeleteAReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if(res.ok) {
    const reviewData = await res.json();
    dispatch(deleteAReview(reviewId))
    return reviewData;
  } else {
    const error = await res.json();
    console.log("thunkDeleteAReview error message", error)
    return error;
  }
}


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS: {
      const newState = {}; //always start with empty state
      action.productReviews.forEach((review) => newState[review.id] = review);
      console.log("newState in reducer", newState);
      return newState;
    }
    case POST_A_REVIEW: {
      return { ...state, [action.review.id]: action.review }
    }
    case DELETE_A_REVIEW: {
      const newState = { ...state };
      //syntax to delete an key:value pair from an newState object
      delete newState[action.reviewId]
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
