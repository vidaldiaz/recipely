const User = require('../models/User')
const Inventory = require('../models/Inventory')
const Recipes = require('../models/Recipe')
const passport = require('../config/passport')

exports.loginView = (req, res) => res.render('login')
exports.signupView = (req, res) => res.render('signup')

exports.signupProcess = async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body)
  await User.register({ name, email }, password)
  res.redirect('/profile')
}

exports.loginProcess = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
})

exports.profileView = async (req, res) => {
  let items = await Inventory.find()
  let recipes = await Recipes.find()
  res.render('profile', { items, recipes })
}
