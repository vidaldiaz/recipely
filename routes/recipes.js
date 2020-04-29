const express = require('express')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')

const {
  addRecipesView,
  showMatchedRecipes,
  showRecipesPost,
  showRecipeFullDetails,
} = require('../controllers/recipes.controller')

router.get('/addRecipes', addRecipesView)

router.get('/details/:id', showRecipeFullDetails)
router.get('/showRecipes/:id', showMatchedRecipes)

module.exports = router
