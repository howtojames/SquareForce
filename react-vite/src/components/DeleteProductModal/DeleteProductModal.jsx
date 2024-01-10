
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
    <div className='delete-spot-modal-container'>
      <h3>End listing</h3>
      <p>Are you sure you want to end this listing?</p>
      <form onSubmit={handleSubmit}>
      <button onClick={closeModal} id='no'>Cancel</button>
        <button onClick={handleSubmit} id='yes'>End listing</button>

      </form>
    </div>
  );
}

export default DeleteProductModal;
