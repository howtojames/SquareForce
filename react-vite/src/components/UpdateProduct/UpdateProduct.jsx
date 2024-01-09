import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import './UpdateProduct.css';
import { thunkGetProductDetails, thunkUpdateAProduct } from '../../redux/product';



function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { productId } = useParams();
  productId = parseInt(productId)
  console.log("productId", productId)

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState('');

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  //const [category, setCategory] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);



    useEffect(() => {
        dispatch(thunkGetProductDetails(productId));
    }, [dispatch, productId]);

    const productStateObj = useSelector(state => state.product);  //access using computed value
    console.log('productStateObj', productStateObj);
    const productStateArr = Object.values(productStateObj)
    const productObj = productStateArr[productId - 1];

    useEffect(() => {
        if(productObj) {
            console.log("productObj in useEffect", productObj)
            setTitle(productObj.title);
            setPrice(productObj.price);
            setCondition(productObj.condition);
            //dont know how to set image here, can't just use string
            setDescription(productObj.description);
        }
    }, [productStateObj]);


  const onSubmit = async e => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    //setHasSubmitted(true);
    //hasSubmtited still false
    //console.log('hasSubmitted after setter', hasSubmitted);

    //keys have to match variables in models
    const formData = new FormData ();
    formData.append("title", title)
    formData.append("price", price)
    formData.append("condition", condition)
    formData.append("image", image)
    formData.append("description", description)

    for (const entry of formData.entries()) {
        console.log("formData", entry);
      }


    // Ideally, we'd persist this information to a database using a RESTful API.
    // For now, though, just log the contact us information to the console.
    //console.log("productData", productData);

    //thunk takes in two arguments
    const updateProductRes = await dispatch(thunkUpdateAProduct(productId, formData))
    console.log('updateProductRes', updateProductRes)

    // Reset the form state.
    setTitle('');
    setPrice('');
    setCondition('');
    setImage('');
    setDescription('');


    //setValidationErrors({});
    //setHasSubmitted(false);
    navigate('/');
  }

  //true here
  //console.log('hasSubmitted', hasSubmitted);
  return (
    <div>
      <h2>Revise Listing</h2>
      {/* check aws s3 phase 3 again */}
      {/* 1:38:00 ok */}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input id='name-input' type='text'
            onChange={e => setTitle(e.target.value)} value={title}
          />
          {/* <div className='error'>
            {hasSubmitted && validationErrors.name && `* ${validationErrors.name}`}
          </div> */}
        </div>
        <div>
          <label>Price:</label>
          <input id='price-input' type='text'
            onChange={e => setPrice(e.target.value)} value={price}
          />
        </div>
       <div>
          <label>Condition:</label>
          <select
            id='condition-select' type='text'
            onChange={e => setCondition(e.target.value)} value={condition}
          >
            <option value='' disabled>
              -
            </option>
            <option>New</option>
            <option>Used - Like New</option>
            <option>Used - Fair</option>
          </select>
        </div>
        <div>
            <label>Image:</label>
            <input id='image-file-input'
              type='file'
              accept='image/*'
              onChange={e => setImage(e.target.files[0])}
            />
        </div>
        <div>
          <label>Description:</label>
            <textarea id='description-input' type='text'
              onChange={e => setDescription(e.target.value)} value={description}
            />
        </div>

        <button>List it</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
