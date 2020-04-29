const Recipe = require('../models/Recipe')
const Inventory = require('../models/Inventory')
const passport = require('../config/passport')

exports.addRecipesView = (req, res) => res.render('recipes/addRecipes')

exports.showMatchedRecipes = async (req, res) => {
  counter = 0
  let fullMatches = []
  let semiMatches = []

  console.log(req.params)
  const { id } = req.params
  const currentRecipe = await Inventory.findById(id)
  const ingredientsArray = currentRecipe.products

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
  const currentRecipe = await Recipe.findById(id)
  res.render('recipes/detailedViewRecipe', currentRecipe)
}
