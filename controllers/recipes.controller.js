const Recipe = require('../models/Recipe')
const User = require('../models/User')

exports.addRecipesView = (req, res) => res.render('recipes/addRecipes')

exports.addRecipesPost = async (req, res) => {
  const { recipeName, ingredients, recipeSteps } = req.body
  const { url: recipePath, originalName: recipeImage } = req.file
  const user = req.user.id

  const newRecipe = await Recipe.create({
    recipeName,
    ingredients,
    recipeSteps,
    recipePath,
    recipeImage,
    user: req.user.id,
  })
  await User.findByIdAndUpdate(user, { $push: { recipes: newRecipe } })
  res.redirect('/profile')
}

exports.editRecipeView = async (req, res) => {
  let recipes = await Recipe.findById(req.params.id)
  res.render('recipes/editRecipes', { recipes })
}

exports.editRecipePost = async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body })
  console.log(recipe)
}
