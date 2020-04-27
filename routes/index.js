const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
  loginView,
  signupView,
  signupProcess,
  loginProcess,
  showPlaces,
} = require('../controllers/index.controller')

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
    successRedirect: '/index',
    failureRedirect: '/login',
    scope: ['email'],
  })
)

module.exports = router
