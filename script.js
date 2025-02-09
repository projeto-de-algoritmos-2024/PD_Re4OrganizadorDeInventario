let items = [
    { id: 1, name: 'Pistola', weight: 2, value: 8, image: 'assets/images/handgun.png' },
    { id: 2, name: 'Espingarda', weight: 4, value: 10, image: 'assets/images/RE4R_W-870.png' },
    { id: 3, name: 'Ervas Verdes', weight: 1, value: 5, image: 'assets/images/Green.png' },
];

let selectedItems = new Set();
function createItemElement(item) {
    const div = document.createElement('div'); div.className = 'item';
    div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="item-name">${item.name}</div>
    <div class="item-stats">
    <span>Peso: ${item.weight}</span>
    <span>Valor: ${item.value}</span>
    </div>
    `;
    return div;
}

function updateDisplay() {
    const itemsList = document.getElementById('itemsList');
    const selectedItemsDiv = document.getElementById('selectedItems');
    itemsList.innerHTML = '';
    selectedItemsDiv.innerHTML = '';
    items.forEach(item => {
        const itemElement = createItemElement(item);
        itemsList.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});