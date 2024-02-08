import { useState, useEffect, useRef }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetProductReviews } from '../../redux/reviews';
import './ReviewsView.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import PostReviewModal from '../PostReviewModal/PostReviewModal';

function ReviewsView ({productId}) {

    console.log("productId in ReviewsView", productId);

    //logic for Modal
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.session.user)
    const ulRef = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);

    //dispatch and selector logic
    useEffect(() => {
        dispatch(thunkGetProductReviews(productId));
    }, [productId]);

    //state.review
    const reviewState = useSelector(state => state.review);
    console.log("reviewsState", reviewState);

    const reviewArr = Object.values(reviewState);
    console.log("reviewArr", reviewArr)

    //submit a review
    const onSubmit = () => {

    }

    return (
        <div id="reviews-section-container">
            <div id="reviews-border"></div>

            <div id="review-top-container">
                <div id="review-title">Reviews</div>


                <div className="post-review-button-container">
                    {/* {!loggedIn || (loggedIn && ownerId === sessionUser.id) || (loggedIn && userReviewed) ?
                    <></> : */}
                    <div id="review-button">  {/* pass in props for spot.id */}
                        <OpenModalButton
                        /* id="review-button" */
                        itemText={(<div id="review-button">Write a review</div>)}
                        onItemClick={closeMenu}
                        modalComponent={<PostReviewModal />}
                        />
                    </div>{/* } */}
                </div>
            </div>

            <div id="reviews-container">
                    {/* render review components */}
                    {reviewArr.map((review) => (
                    <div id="single-review-container">
                        <div id="single-review-left">
                            <div>{review.stars}</div>
                            <div id="by-username">{`by ${review.user.username}`}</div>
                        </div>
                        <div id="single-review-right">
                            {review.review}
                        </div>
                    </div>
                    ))}
            </div>
        </div>

    )
}

export default ReviewsView;
