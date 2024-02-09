
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css';
import { thunkDeleteAReview } from '../../redux/reviews';


function DeleteReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

 const handleSubmit = async (e) => {
    e.preventDefault();

    /* await dispatch(thunkDeleteAProduct(productId)) */
    //add this to re-render the data on "Manage your spots page"
    await dispatch(thunkDeleteAReview(reviewId));
    closeModal();

  };

  return (
    <div id='delete-product-modal-container'>
      <h1 id="end-listing">Delete Review</h1>
      <p id="delete-product-message">Are you sure you want to delete this review?</p>
      <form onSubmit={handleSubmit}>
      <div id="delete-product-border"></div>
      <div id="buttons-container">
        <button id='delete-cancel' onClick={closeModal}>Cancel</button>
        <button id='delete-end-listing' onClick={handleSubmit}>Delete Review</button>
      </div>
      </form>
    </div>
  );
}

export default DeleteReviewModal;
