const User = require('../models/User')
const Inventory = require('../models/Inventory')
const passport = require('../config/passport')

exports.loginView = (req, res) => res.render('login')
exports.signupView = (req, res) => res.render('signup')

exports.signupProcess = async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body)
  await User.register({ name, email, places: [] }, password)
  res.redirect('/')
}

exports.loginProcess = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
})

exports.profileView = async (req, res) => {
  let items = await Inventory.find()
  console.log(items)
  res.render('profile', { items })
}
