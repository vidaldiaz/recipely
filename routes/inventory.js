const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/isAuth')

const {
  inventoryView,
  inventoryPost,
  editInventoryView,
  editInventoryPost,
  deleteItem,
} = require('../controllers/inventory.controllers')

router.get('/', isAuth, inventoryView)
router.post('/', inventoryPost)

router.post('/delete/:id', deleteItem)

router.get('/edit/:id', isAuth, editInventoryView)
router.post('/edit/:id', editInventoryPost)

module.exports = router
