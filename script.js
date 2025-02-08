let items = [];
let selectedItems = new Set();
function updateDisplay() {
const itemsList = document.getElementById('itemsList');
const selectedItemsDiv = document.getElementById('selectedItems');
itemsList.innerHTML = '';
selectedItemsDiv.innerHTML = '';
}
document.addEventListener('DOMContentLoaded', () => {
updateDisplay();
});