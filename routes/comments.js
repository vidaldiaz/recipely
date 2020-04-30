const router = require('express').Router()
const isAuth = require('../middlewares/isAuth')

const {
  addCommentView,
  addCommentPost,
  editCommentView,
  editCommentPost,
  deleteComment,
} = require('../controllers/comments.controller')

router.get('/add/:id', isAuth, addCommentView)
router.post('/add/:id', addCommentPost)

router.get('/edit/:id', editCommentView)
router.post('/edit/:id', editCommentPost)

router.get('/delete/:id', deleteComment)

module.exports = router
