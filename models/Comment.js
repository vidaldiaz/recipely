const { Schema, model } = require('mongoose')

const Comment = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  comment: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('Comment', Comment)
