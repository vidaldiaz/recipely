const express = require('express')
const router = express.Router()
const passport = require('passport')
const isAuth = require('../middlewares/isAuth')

const {
  loginView,
  signupView,
  signupProcess,
  loginProcess,
  showPlaces,
  profileView,
  logout,
} = require('../controllers/index.controller')

const { addRecipesPost } = require('../controllers/recipes.controller')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/login', loginView)
router.get('/signup', signupView)
router.post('/signup', signupProcess)
router.post('/login', loginProcess)

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    scope: ['email'],
  })
)

router.get('/profile', isAuth, profileView)

router.get('/logout', logout)

module.exports = router
