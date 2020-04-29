exports.addRecipesView = (req, res) => res.render('recipes/addRecipes')

exports.showRecipesView = (req, res) => {
  console.log(req.params)
  res.render('recipes/showRecipes')
}
