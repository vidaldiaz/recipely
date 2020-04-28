const { model, Schema } = require('mongoose')
const configLocalMongoose = require('passport-local-mongoose')

const recipeSchema = new Schema(
  {
    recipeName: String,
    recipeSite: String,
    ingredients: String,
    recipeImage: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

recipeSchema.plugin(configLocalMongoose, { usernameField: 'email' })
module.exports = model('Recipe', recipeSchema)
