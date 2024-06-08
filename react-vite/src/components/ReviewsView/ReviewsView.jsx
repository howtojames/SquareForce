import { useState, useEffect, useRef }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetProductReviews } from '../../redux/reviews';
import './ReviewsView.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import PostReviewModal from '../PostReviewModal/PostReviewModal';
//import { thunkGetProductDetails } from '../../redux/product';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import StarsRatingInput from '../PostReviewModal/StarsRatingInput';

function ReviewsView ({productId, productData}) {

    //console.log("productId in ReviewsView", productId);

    //logic for Modal
    const [showMenu, setShowMenu] = useState(false);
    //const user = useSelector((state) => state.session.user)
    const ulRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, dispatch]);
    const closeMenu = () => setShowMenu(false);


    //logic to determine if user is logged in or not
    const sessionUser = useSelector(state => state.session.user);
    //this runs on first render
    let loggedIn = false;  //not logged in by default
    if(sessionUser && Object.values(sessionUser).length > 0){
        loggedIn = true;
    } else {
        loggedIn = false;
    } //after this loggedIn is determined and put to use in the render
    //console.log('loggedIn', loggedIn);
    //if you comment this back in , we will get an error when we go to SpotDetails while logged out
    if(loggedIn){
        //console.log('sessionUser', sessionUser);
        //console.log('sessionUser.id', sessionUser.id);
    }

    //dispatch and selector logic
    useEffect(() => {
        dispatch(thunkGetProductReviews(productId));

    }, [productId, dispatch]);

    //state.review
    const reviewState = useSelector(state => state.review);
    //console.log("reviewState", reviewState);

    if (!reviewState) return null;
    const reviewArr = Object.values(reviewState);
    //console.log("reviewArr", reviewArr)

    let userReviewed = false;
    //loop through each reviewArr element, using user.id
    if(sessionUser){
        for (let review of reviewArr){
            if(review.user.id === sessionUser.id){
                userReviewed = true;
            }
        }
    }
    console.log("reviewArr", reviewArr);
    //submit a review
    // const onSubmit = () => {

    // }

    return (
        <div id="reviews-section-container">
            <div id="reviews-border"></div>

            <div id="review-top-container">
                <div id="review-title">Reviews</div>


                <div className="post-review-button-container">
                    {/* if not logged in, if sellerId is same as current user id, if review has already been posted */}
                    {!loggedIn || (loggedIn && productData.sellerId === sessionUser.id) || (loggedIn && userReviewed) ?
                    <></> :
                    <div >  {/* pass in props for spot.id */}
                        <OpenModalMenuItem
                        itemText={(<div id="review-button">Write a review</div>)}
                        onItemClick={closeMenu}
                        modalComponent={<PostReviewModal productId={productId}/>}
                        />
                    </div>
                    }
                </div>
            </div>

            <div id="reviews-container">
                {reviewArr.length === 0 ? (
                    <div id='no-reviews'>
                        There are currently no reviews.
                        {!loggedIn || (loggedIn && productData.sellerId === sessionUser.id) /* || (loggedIn && userReviewed) */ ?
                        <></> :
                        <div id="be-the-first">
                            <div> Be the first to </div>
                            <OpenModalMenuItem
                            itemText={(<span id="write-a-review">write a review</span>)}
                            onItemClick={closeMenu}
                            modalComponent={<PostReviewModal productId={productId}/>}
                            />
                        </div>
                        }
                    </div>
                ) : (
                    reviewArr.map((review) => (
                        <div key={review.id} id="single-review-container">
                            <div id="single-review-left">
                                <div className='star-ratings-containe'>
                                    <StarsRatingInput
                                        disabled={true}
                                        rating={review.stars}
                                        forDisplay={true}
                                    />
                                </div>
                                <div id="by-username">{`by ${review.user.username}`}</div>
                                {/* had to add a loggedInchekc */}
                                {loggedIn && sessionUser.id === review.buyerId ? (
                                    <div id="delete-review-button">  {/* pass in props for spot.id */}
                                        <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                            </div>
                            <div id="single-review-right">
                                {review.review}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

    )
}

export default ReviewsView;
