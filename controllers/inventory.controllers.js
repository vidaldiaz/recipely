// const Inventory = require('../models/Inventory')
// const User = require('../models/User')

// exports.inventoryView = (req, res) => res.render('inventory/inventory')

// exports.inventoryPost = async (req, res) => {
//   let { products } = req.body
//   console.log(req.body)
//   const user = req.user.id
//   products.shift()
//   const newInventory = await Inventory.create({ products, user: req.user.id })
//   await User.findByIdAndUpdate(user, { $push: { inventories: newInventory } })
//   res.redirect('/profile')
// }

// exports.editInventoryView = async (req, res) => {
//   let items = await Inventory.findById(req.params.id)
//   res.render('inventory/edit', { items })
// }

// exports.deleteItem = async (req, res) => {
//   await Inventory.findByIdAndDelete(req.params.id)
//   res.redirect('/profile')
// }

// exports.editInventoryPost = async (req, res) => {
//   let { products } = req.body
//   products.shift()
//   await Inventory.findByIdAndUpdate(req.params.id, { ...req.body })
//   res.redirect('/profile')
// }

const Inventory = require('../models/Inventory')
const User = require('../models/User')

exports.inventoryView = (req, res) => res.render('inventory/inventory')

exports.inventoryPost = async (req, res) => {
  let { products } = req.body
  const user = req.user.id
  products.shift()
  const newInventory = await Inventory.create({ products, user: req.user.id })
  await User.findByIdAndUpdate(user, { $push: { inventories: newInventory } })
  res.redirect('/profile')
}

exports.editInventoryView = async (req, res) => {
  let items = await Inventory.findById(req.params.id)
  res.render('inventory/edit', { items })
}

exports.deleteItem = async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id)
  res.redirect('/profile')
}

exports.editInventoryPost = async (req, res) => {
  let { products } = req.body
  products.shift()
  await Inventory.findByIdAndUpdate(req.params.id, { ...req.body })
  res.redirect('/profile')
}
