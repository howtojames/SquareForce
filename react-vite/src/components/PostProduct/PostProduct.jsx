import { useState, useEffect } from 'react';
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
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  //const [category, setCategory] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (!title.length) errors['title']='You must enter a title for your item.';
    if (price <= 0) errors['price']='Invalid price.'
    //empty string is falsey in js
    if (!condition) errors['condition']='You must select a condition for your item.'
    if (!image) errors['image']='You must upload a image for your item.'
    if (!description.length) errors['description']='You must enter a description for your item.';

    //if (!email.includes('@')) errors['email']='Please provide a valid Email';
    setValidationErrors(errors);
  }, [title, price, condition, description, image]);


  const onSubmit = async e => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();
    setHasSubmitted(true);

    //keys have to match variables in models
    const formData = new FormData ();
    formData.append("title", title)
    formData.append("price", price)
    formData.append("condition", condition)
    formData.append("image", image)
    formData.append("description", description)


    // for (const entry of formData.entries()) {
    //   console.log("formData", entry);
    // }

    const postProductRes = await dispatch(thunkPostAProduct(formData))
    //console.log('postProductRes', postProductRes)

    // Reset the form state.
    setTitle('');
    setPrice('');
    setCondition('');
    setImage('');
    setDescription('');
    //setCategory('');

    setValidationErrors({});
    setHasSubmitted(false);
    //after posting a product, navigate to the seller's page
    navigate('/products/selling');
  }


  //console.log('!image', !image);
  return (
    <div id="post-product-container">
      <h2>List an Item</h2>
      {/* check aws s3 phase 3 again */}
      {/* 1:38:00 ok */}
      <form onSubmit={onSubmit} encType="multipart/form-data" id='post-product-form'>
        <div>
          <div className="post-product-section-label">Title</div>
          <div className="post-product-section-description" id='title-description'>Use words people would search for when looking for your item.</div>
          <input id='name-input' type='text'
            onChange={e => setTitle(e.target.value)} value={title}
          />
          <div className='post-product-error' id="title-error">{hasSubmitted && validationErrors.title && `${validationErrors.title}`}</div>
          <div className="post-product-grey-border"></div>

        </div>
        <div>
          <div className="post-product-section-label">Pricing</div>
          <div id="buy-grey-container">
            <div>
              <div id="buy-it-now">Buy It Now</div>
              <div className="post-product-section-description">Buyers can purchase immediately at this price.</div>
            </div>
            <div id='fake-input'>
              <div id="dollar">$</div>
              <input id='price-input' inputMode='numeric'
                placeholder='Please enter an integer'
                onChange={e => setPrice(e.target.value)} value={price}
              />
            </div>
          </div>
            {/* need error to appear before submission */}
            <div className='post-product-error' id="price-error">{hasSubmitted && validationErrors.price && `${validationErrors.price}`}</div>
           <div className="post-product-grey-border"></div>
        </div>

       <div>
          <div className="post-product-section-label">Condition</div>
          <div id="condition-flex-container">
            <div>
              <div id="required">Required</div>
              <div className="post-product-section-description">Buyers need these details to find your item</div>
            </div>
            <div id="select-container">
              <select
                id='select-condition'
                type='text'
                onChange={e => setCondition(e.target.value)}
                value={condition}
              >
                <option value='' disabled>
                  -
                </option>
                <option value='New'>New</option>
                <option value='Used - Like New'>Used - Like New</option>
                <option value='Used - Fair'>Used - Fair</option>
              </select>
              <div className='post-product-error' id="condition-error">{hasSubmitted && validationErrors.condition && `${validationErrors.condition}`}</div>
            </div>
          </div>
          <div className="post-product-grey-border"></div>
        </div>
        <div>
            <div className="post-product-section-label">Add a Photo</div>
            <div className="post-product-section-description" id="image-description">Improve your buyer's confidence by uploading an image</div>
            <input id='image-file-input'
              type='file'
              accept='image/*'
              onChange={e => setImage(e.target.files[0])}
            />
            <div className='post-product-error'>{hasSubmitted && validationErrors.image && `${validationErrors.image}`}</div>
             <div className="post-product-grey-border"></div>
        </div>
        <div>
          <div className="post-product-section-label">Description:</div>
            <div className="post-product-section-description" id="detail-description">Write a detailed description of your item</div>
            <textarea id='description-input' type='text'
              onChange={e => setDescription(e.target.value)} value={description}
            />
             <div className='post-product-error'>{hasSubmitted && validationErrors.description && `${validationErrors.description}`}</div>
        </div>

        {/* when length is 0 diabled=false, so we can list it */}
        {/* no need for disabled, disabled={Object.values(validationErrors).length} */}
        <button  id="list-it">List it</button>
      </form>
    </div>
  );
}

export default PostProduct;
