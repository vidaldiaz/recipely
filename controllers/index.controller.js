const User = require('../models/User')
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
