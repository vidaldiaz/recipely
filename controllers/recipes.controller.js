const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Inventory = require('../models/Inventory')
const Comment = require('../models/Comment')
const passport = require('../config/passport')

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
  const { url: recipePath, originalName: recipeImage } = req.file
    ? req.file
    : { url: (id.recipePath = id.recipePath), originalName: id.recipeImage }
  const recipe = await Recipe.findByIdAndUpdate(
    id,
    { $set: { ...req.body, recipeImage, recipePath } },
    { new: false }
  )
  res.redirect('/profile')
}

exports.showMatchedRecipes = async (req, res) => {
  counter = 0
  let fullMatches = []
  let semiMatches = []

  console.log(req.params)
  const { id } = req.params
  const currentRecipe = await Inventory.findById(id)
  const ingredientsArray = currentRecipe.products

  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsArray[i] = ingredientsArray[i].toLowerCase()
  }

  console.log(`Ingredientes a Buscar: ${ingredientsArray}`)

  const allRecipes = await Recipe.find({})
  for (let i = 0; i < allRecipes.length; i++) {
    for (let j = 0; j < allRecipes[i].ingredients.length; j++) {
      //console.log(allRecipes[i].ingredients[j])
      for (let k = 0; k < ingredientsArray.length; k++) {
        if (ingredientsArray[k] === allRecipes[i].ingredients[j]) {
          console.log(allRecipes[i]._id)
          fullMatches.push(allRecipes[i])
          counter++
        } else if (allRecipes[i].ingredients[j].includes(ingredientsArray[k])) {
          semiMatches.push(allRecipes[i])
        }
      }
    }
  }
  //console.log(counter)
  //console.log(fullMatches)
  //console.log(semiMatches)

  let fullMatchesUnique = [...new Set(fullMatches)]
  let semiMatchesUnique = [...new Set(semiMatches)]

  semiMatchesUnique = semiMatchesUnique.filter((val) => !fullMatchesUnique.includes(val))
  res.render('recipes/showRecipes', {
    fullMatchesUnique,
    counter,
    semiMatchesUnique,
    ingredientsArray,
  })
}

exports.showRecipeFullDetails = async (req, res) => {
  const { id } = req.params
  const currentRecipe = await Recipe.findById(id).populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'user',
      model: 'User',
    },
  })
  currentRecipe.comments.forEach((comment) => {
    comment.isOwner = req.user.id == comment.user._id
  })
  res.render('recipes/detailedViewRecipe', {
    currentRecipe,
    comments: currentRecipe.comments,
  })
}

exports.deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id)
  res.redirect('/profile')
}
