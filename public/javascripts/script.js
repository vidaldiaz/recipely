document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!')
  },
  false
)

function inventoryList() {
  const input = document.querySelector('#inventoryInput').value
  document.querySelector('#inventoryInput').value = ''
  let text = document.createTextNode(input)
  let newItem = document.createElement('li')
  let newInput = document.createElement('input')
  let newButton = document.createElement('button')
  newItem.appendChild(newInput)
  newItem.appendChild(newButton)
  newButton.innerHTML = 'Delete'
  newInput.value = input
  document.querySelector('#inventoryList').appendChild(newItem)
  newItem.setAttribute('name', 'product')
  newInput.setAttribute('value', input)
  newInput.setAttribute('name', 'products')
  newButton.classList.add('btn', 'btn-remove')
  newButton.setAttribute('type', 'button')
  newItem.style.listStyleType = 'none'

  const buttons = document.querySelectorAll('.btn.btn-remove')
  buttons.forEach((btn) => (btn.onclick = () => btn.parentNode.remove()))
}
