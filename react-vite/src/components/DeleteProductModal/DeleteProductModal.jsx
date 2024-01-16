
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteProductModal.css';
import { thunkGetCurrentUserProducts, thunkDeleteAProduct } from '../../redux/product';


function DeleteProductModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

 const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(thunkDeleteAProduct(productId))
    //add this to re-render the data on "Manage your spots page"
    await dispatch(thunkGetCurrentUserProducts());
    closeModal();

  };

  return (
    <div id='delete-product-modal-container'>
      <h1 id="end-listing">End listing</h1>
      <p id="delete-product-message">Are you sure you want to end this listing?</p>
      <form onSubmit={handleSubmit}>
      <div id="delete-product-border"></div>
      <div id="buttons-container">
        <button id='delete-cancel' onClick={closeModal}>Cancel</button>
        <button id='delete-end-listing' onClick={handleSubmit}>End listing</button>
      </div>
      </form>
    </div>
  );
}

export default DeleteProductModal;
