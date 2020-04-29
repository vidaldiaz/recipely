const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [String],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory
