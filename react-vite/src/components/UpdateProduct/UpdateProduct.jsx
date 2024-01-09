import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './UpdateProduct.css';
import { thunkGetProductDetails } from '../../redux/product';


function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  //const [imageUrl, setImage] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  //const [category, setCategory] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

//   useEffect(() => {
//     const errors = {};
//     if (!name.length) errors['name']='Please enter your Name';
//     if (!email.includes('@')) errors['email']='Please provide a valid Email';
//     setValidationErrors(errors);
//   }, [name, email]);

    useEffect(() => {
        dispatch(thunkGetProductDetails());
    }, [dispatch, id]);

    const productDataObj = useSelector(state => state.product[id]);  //access using computed value
    console.log('productData', productData);


  const onSubmit = async e => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    //setHasSubmitted(true);
    //hasSubmtited still false
    //console.log('hasSubmitted after setter', hasSubmitted);


    // Create a new object for the contact us information.
    // const productData = {
    //   title,
    //   price,
    //   condition,
    //   imageUrl,
    //   description
    //   //category,
    // };

    //keys have to match variables in models
    const formData = new FormData ();
    formData.append("title", title)
    formData.append("price", price)
    formData.append("condition", condition)
    formData.append("image", image)
    formData.append("description", description)


    // Ideally, we'd persist this information to a database using a RESTful API.
    // For now, though, just log the contact us information to the console.
    //console.log("productData", productData);

    const postProductRes = await dispatch(thunkPostAProduct(formData))
    console.log('postProductRes', postProductRes)

    // Reset the form state.
    setTitle('');
    setPrice('');
    setCondition('');
    setImage('');
    setDescription('');
    //setCategory('');

    //setValidationErrors({});
    //setHasSubmitted(false);
    navigate('/');
  }

  //true here
  //console.log('hasSubmitted', hasSubmitted);
  return (
    <div>
      <h2>List an Item</h2>
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
            id='condition-select'
            type='text'
            onChange={e => setCondition(e.target.value)}
            value={condition}
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
              /* placeholder="Write a detailed description of your item" */
              onChange={e => setDescription(e.target.value)} value={description}
            />
        </div>
        {/* <div>
          <label>Category:</label>
          <input id='category-input' type='text'
            onChange={e => setCategory(e.target.value)} value={category}
          />
        </div> */}

        <button>List it</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
