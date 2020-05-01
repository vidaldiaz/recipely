const User = require('../models/User')
const Inventory = require('../models/Inventory')
const Recipes = require('../models/Recipe')
const passport = require('../config/passport')

exports.loginView = (req, res) => res.render('login')
exports.signupView = (req, res) => res.render('signup')

exports.signupProcess = async (req, res) => {
  const { name, email, password } = req.body
  await User.register({ name, email }, password)
  res.redirect('/profile')
}

exports.loginProcess = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
})

exports.profileView = async (req, res) => {
  const { name, _id } = req.user
  const currentUserInventories = await Inventory.find({ user: _id })
  let currentUserRecipes = await Recipes.find({ user: _id })
  res.render('profile', { currentUserInventories, currentUserRecipes, name })
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
