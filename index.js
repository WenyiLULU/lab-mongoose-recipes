const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//const recipeOne = new Recipe({title: "first recipe", cuisine:"chinese"});
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    /*recipeOne
      .save()
      .then(recipe => console.log("recipe creat", recipe))
      .catch(error => console.log("somme error", error))*/
    Recipe.insertMany(data, (error, recipe)=>{
      if (error){
        console.log('An error happened:', error);
        return;
      }else{
        console.log('The user is saved and its value is: ', recipe);
      }
    })  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
