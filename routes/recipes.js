const express = require('express')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const isAuth = require('../middlewares/isAuth')

const {
  addRecipesView,
  showMatchedRecipes,
  showRecipesPost,
  addRecipesPost,
  editRecipeView,
  editRecipePost,
  showRecipeFullDetails,
} = require('../controllers/recipes.controller')

router.get('/addRecipes', isAuth, addRecipesView)
router.post('/addRecipes', uploadCloud.single('recipeImage'), addRecipesPost)

router.get('/editRecipes/:id', editRecipeView)
router.post('/editRecipes/:id', uploadCloud.single('recipeImage'), editRecipePost)
router.get('/details/:id', showRecipeFullDetails)
router.get('/showRecipes/:id', showMatchedRecipes)

module.exports = router
