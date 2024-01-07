import { useState, useEffect } from 'react';
import './PostProduct.css';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');

//   const [validationErrors, setValidationErrors] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   useEffect(() => {
//     const errors = {};
//     if (!name.length) errors['name']='Please enter your Name';
//     if (!email.includes('@')) errors['email']='Please provide a valid Email';
//     setValidationErrors(errors);
//   }, [name, email]);

  const onSubmit = e => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    //hasSubmtited still false
    //console.log('hasSubmitted after setter', hasSubmitted);


    // Create a new object for the contact us information.
    const productData = {
      name,
      price,
      condition,
      category
    };

    // Ideally, we'd persist this information to a database using a RESTful API.
    // For now, though, just log the contact us information to the console.
    console.log("productData", productData);

    // Reset the form state.
    setName('');
    setPrice('');
    setCondition('');
    setCategory('');

    //setValidationErrors({});
    setHasSubmitted(false);
  }

  //true here
  //console.log('hasSubmitted', hasSubmitted);
  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            id='name'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
          {/* <div className='error'>
            {hasSubmitted && validationErrors.name && `* ${validationErrors.name}`}
          </div> */}
        </div>
       <div>
        <label>Condition</label>
        <input id='condition' type="text"/>
       </div>
        {/* <div>
          <label>Phone:</label>
          <input
            id='phone'
            type='text'
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name='phoneType'
            onChange={e => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value='' disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div> */}

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
