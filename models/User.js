const { model, Schema } = require('mongoose')
const configLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    facebookId: String,
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    inventories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.plugin(configLocalMongoose, { usernameField: 'email' })
module.exports = model('User', userSchema)
