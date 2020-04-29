const { model, Schema } = require('mongoose')
const configLocalMongoose = require('passport-local-mongoose')

const recipeSchema = new Schema(
  {
    user:{
      type: Schema.Types.ObjectId,
      ref:'User'
    }
    recipeName: String,
    recipeSite: {
      type: String,
      default: 'http://localhost:3000',
    },
    ingredients: [String],
    recipeSteps: String,
    recipeImage: String,
    recipePath: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

recipeSchema.plugin(configLocalMongoose, { usernameField: 'email' })
module.exports = model('Recipe', recipeSchema)
