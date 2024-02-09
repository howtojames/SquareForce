# Codera

### Link to live site:
https://james-squareforce.onrender.com


### Index
[Feature List](https://github.com/howtojames/SquareForce/wiki/Feature-List) |
[Database Scheme](https://github.com/howtojames/SquareForce/wiki/Database-Schema-and-Backend-Routes) |
[User Stories] (https://github.com/howtojames/SquareForce/wiki/User-Stories)


### Technologies Used
Javascript, React, Redux, Python, Flask, SQLALchemy, PostgreSQL, Render, HTML, CSS, AWS S3


### Summary:
Welcome to SquareForce, your premier destination for buying and selling goods online! At SquareForce, we pride ourselves on providing a seamless and secure platform for users to buy, sell, and discover a wide array of products. Whether you're hunting for laptops, computer, or even game consoles, SquareForce has you covered.


## ScreenShots:
### Splash Page
![splash](react-vite/public/readme-images/splash.png)

### Landing Page
![landing](react-vite/public/readme-images/landing.png)

### Question Details Page
![question-details](react-vite/public/readme-images/question-details.png)

### Edit a Question
![edit-question](react-vite/public/readme-images/edit-question.png)

### Edit a Comment
![edit-comment](react-vite/public/readme-images/edit-comment.png)

### Saved Questions
![saved-questions](react-vite/public/readme-images/saved-questions.png)


## Getting started
1. To clone the project:
```
git clone git@github.com:Nick-Root/Codera.git
```
2. Create an .env file in the Codera folder. Copy `.env.example` file into the `.env file.`

3. To install dependencies and seed the database, `cd` into the `Codera` folder:
```
pipenv install
pipenv install -r requirements.txt
```

4. To seed the database:
```
pipenv run flask db init
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask seed all
```

5. To start the backend, run:
```
pipenv run flask run
```

6. Split into a different terminal, and `cd` into the `react-vite` folder. Run `npm run dev` to start the frontend.
```
npm install
npm run dev
```

7. In your browser, navigate to [`localhost:5173`].


## Features
### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Products

### Create Product

* As a logged in user, I want to be able to post a new product.
   * When I'm the home (`/`) page:
      * I can click on the "Sell" button that will direct me to a page to post a product. 
      * This is so that I can list my product to the general public. 

### Viewing Products

* As a logged in _or_ logged out user, I want to view a selection of the most recent products.
   * When I'm on the home(`/`) page:
     * I can view a list of products being that are on the website.
      * This is so that I can browse through a selection of products I would can buy.

* As a logged in _or_ logged out user, I want to be able to view a specific product on the product page.
   * When I'm on the `/product/:id` page:
      * I can view the details of the specific product.

### Revising Product Details

* As a logged in user, I want to be able to revise a product's details 
  * When I'm on the `/selling` page:
    * I can click "Revise" to make changes to the product I have posted
      * So it can take me to a separate page so I can edit my listing.

### Deleting A Product

* As a logged in user, I want to be able to delete my products by clicking on "End listing" on an item listed under the '/selling' page.
  * When I'm on the `/products/:id` page:
    * I can click "Delete" to permanently delete a question I have posted.
      * So that if I have found the answer on my own, I can easily remove it.


## Shopping Cart:

### Viewing Shopping Cart:
* As a logged in user, I want to be able to view a list of products I have added to my shopping cart.
  * When I'm on the `/cart` page:
     * I can see a list of products/items I have added to my shopping cart.
     * So that I can make changes to my current shopping cart before doing something else.


### Adding a Product:
* As a logged in user, I want to be able to add a product to my shopping cart by clicking on "Add to cart" on the product details page.
  * When I'm on the `/products/:id` page:
     * I can click "Add to cart" to add the product to my shopping cart
     * So that I can view the my items listed on the `/cart` page.

### Editing Product Quantity:
* As a logged in user, I want to be able to change the quantity of products I would like to buy.
  * When I'm on the `/cart` page:
    * I can click change the quantity of a specific product.
    * So that I can change my change the quantity of the item before checking out.

### Deleting a Product:
* As a logged in user, I want to be able to remove a specific product from my shopping cart.
  * When I'm on the `/cart` page: 
    * I can click on "Remove" to remove an item from my shopping cart.
    * So that I can finalize my decisions before continuing to shop or checking out.


## Connect
* James Ruan [Github](https://github.com/howtojames) [LinkedIn](https://www.linkedin.com/in/james-ruan-03b95b104/)
