const Inventory = require('../models/Inventory')

exports.inventoryView = (req, res) => res.render('inventory/inventory')

exports.inventoryPost = async (req, res) => {
  let { products } = req.body
  products.shift()
  await Inventory.create({ products })
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
