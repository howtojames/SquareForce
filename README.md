# Codera

### Link to live site:
https://james-squareforce.onrender.com


### Index
[Feature List](https://github.com/howtojames/SquareForce/wiki/Feature-List) |
[Database Scheme](https://github.com/howtojames/SquareForce/wiki/Database-Schema-and-Backend-Routes) |
[User Stories] (https://github.com/howtojames/SquareForce/wiki/User-Stories)


### Technologies Used
Javascript, React, Redux, Python, Flask, SQLALchemy, PostgreSQL, Render, HTML, CSS


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
### Questions
   -Users should be able to view all questions asked.

   -Users should be able to create a new question.

   -Users should be able to update questions they created.

   -Users should be able to delete questions they created.

Routes: `/`, `/questions`, `/questions/:id`, `/questions/current`

### Comments
   -Users should be able to view all comments on a question.

   -Users should be able to create new comments on a question.

   -Users should be able to update their comments.

   -Users should be able to delete their comments.

Routes: `/questions/:id`, `/comments/current`

### Save for Later
   -Users should be able to view all of their saved questions.

   -Users should be able to save a question for later.

   -Users should be able to remove a question from their saved questions.

Routes: `/`, `/saved`

###  Topics/Tags
   -Users should be able to view all topics/tags on a question.

   -Users should be able to add a topic/tag to their question(s).

   -Users should be able to change or remove topics from their questions.

Routes: `/`, `/topics/:id`


## Connect
* James Ruan [Github](https://github.com/howtojames) [LinkedIn](https://www.linkedin.com/in/james-ruan-03b95b104/)https://www.linkedin.com/in/james-ruan-03b95b104/)
