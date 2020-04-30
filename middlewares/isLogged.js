module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile')
  } else {
    next()
  }
}
