import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PostProduct.css';
import { thunkPostAProduct } from '../../redux/product';

function PostProduct() {
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


    for (const entry of formData.entries()) {
      console.log("formData", entry);
    }



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
    <div id="post-product-container">
      <h2>List an Item</h2>
      {/* check aws s3 phase 3 again */}
      {/* 1:38:00 ok */}
      <form onSubmit={onSubmit} encType="multipart/form-data" id='post-product-form'>
        <div>
          <div className="post-product-section-label">Title</div>
          <div className="post-product-section-description">Use words people would search for when looking for your item.</div>
          <input id='name-input' type='text'
            onChange={e => setTitle(e.target.value)} value={title}
          />
          <div> </div>
          <div className="post-product-grey-border"></div>
          {/* <div className='error'>
            {hasSubmitted && validationErrors.name && `* ${validationErrors.name}`}
          </div> */}
        </div>
        <div>
          <div className="post-product-section-label">Pricing</div>
          <div id="buy-grey-container">
            <div>
              <div id="buy">Buy It Now</div>
              <div className="post-product-section-description">Buyers can purchase immediately at this price.</div>
            </div>
            <div id="dollar">$</div>
            <input id='price-input' type='text'
              onChange={e => setPrice(e.target.value)} value={price}
            />
          </div>
           <div className="post-product-grey-border"></div>
        </div>
       <div>
          <div className="post-product-section-label">Condition</div>
          <div>
            <div id="required">Required</div>
            <div className="post-product-section-description">Buyers need these details to find your item</div>
          </div>
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
          <div className="post-product-grey-border"></div>
        </div>
        <div>
            <div className="post-product-section-label">Add a Photo:</div>
            <input id='image-file-input'
              type='file'
              accept='image/*'
              onChange={e => setImage(e.target.files[0])}
            />
             <div className="post-product-grey-border"></div>
        </div>
        <div>
          <div className="post-product-section-label">Description:</div>
            <textarea id='description-input' type='text'

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
