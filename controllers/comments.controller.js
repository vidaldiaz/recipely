const Comment = require('../models/Comment')
const User = require('../models/User')
const Recipe = require('../models/Recipe')

exports.addCommentView = (req, res) => {
  const id = req.params.id
  res.render('comments/add', { id })
}

exports.addCommentPost = async (req, res) => {
  const user = req.user.id
  const { comment } = req.body
  const recipe = req.params.id
  console.log(req.params)
  const newComment = await Comment.create({
    comment,
    user: req.user.id,
    recipe: req.params.id,
  })
  await User.findByIdAndUpdate(user, { $push: { comments: newComment } })
  await Recipe.findByIdAndUpdate(recipe, { $push: { comments: newComment } })
  res.redirect(`/recipes/details/${req.params.id}`)
}

exports.editCommentView = async (req, res) => {
  const comments = await Comment.findById(req.params.id)
  res.render('comments/editComment', comments)
}

exports.editCommentPost = async (req, res) => {
  let comment = await Comment.findByIdAndUpdate(req.params.id, { ...req.body }).populate(
    'recipe',
    '_id'
  )
  console.log(comment)
  res.redirect(`/recipes/details/${comment.recipe._id}`)
}

exports.deleteComment = async (req, res) => {
  const recipeId = await Comment.findById(req.params.id).populate('recipe', 'id')
  console.log(recipeId)
  await Comment.findByIdAndDelete(req.params.id)
  res.redirect(`/recipes/details/${recipeId.recipe._id}`)
}
