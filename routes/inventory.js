const express = require('express')
const router = express.Router()

const {
  inventoryView,
  inventoryPost,
  editInventoryView,
  editInventoryPost,
  deleteItem,
} = require('../controllers/inventory.controllers')

router.get('/', inventoryView)
router.post('/', inventoryPost)

router.post('/delete/:id', deleteItem)

router.get('/edit/:id', editInventoryView)
router.post('/edit/:id', editInventoryPost)

module.exports = router
