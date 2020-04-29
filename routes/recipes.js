const express = require('express')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')

const {
  addRecipesView,
  showRecipesView,
  showRecipesPost,
} = require('../controllers/recipes.controller')

router.get('/addRecipes', addRecipesView)

router.get('/showRecipes/:id', showRecipesView)

module.exports = router
