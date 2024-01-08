import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './PostProduct.css';
import { thunkPostAProduct } from '../../redux/product';

function PostProduct() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
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


  const onSubmit = async e => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    //setHasSubmitted(true);
    //hasSubmtited still false
    //console.log('hasSubmitted after setter', hasSubmitted);


    // Create a new object for the contact us information.
    const productData = {
      title,
      price,
      condition,
      description
      //category,
    };

    // Ideally, we'd persist this information to a database using a RESTful API.
    // For now, though, just log the contact us information to the console.
    console.log("productData", productData);

    const postProductRes = await dispatch(thunkPostAProduct(productData))
    console.log('postProductRes', postProductRes)

    // Reset the form state.
    setTitle('');
    setPrice('');
    setCondition('');
    setDescription('');
    //setCategory('');

    //setValidationErrors({});
    //setHasSubmitted(false);
  }

  //true here
  //console.log('hasSubmitted', hasSubmitted);
  return (
    <div>
      <h2>List an Item</h2>
      <form onSubmit={onSubmit}>
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

export default PostProduct;
