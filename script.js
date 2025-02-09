function createItemElement(item, isSelected) {
    const div = document.createElement('div');
    div.className = `item ${isSelected ? 'selected' : ''}`;
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-name">${item.name}</div>
        <div class="item-stats">
            <span>Peso: ${item.weight}</span>
            <span>Valor: ${item.value}</span>
        </div>
    `;
    div.addEventListener('click', () => {
        if (selectedItems.has(item.id)) {
            selectedItems.delete(item.id);
        } else {
            selectedItems.add(item.id);
        }
        updateDisplay();
    });
    return div;
}

function updateDisplay() {
    const itemsList = document.getElementById('itemsList');
    const selectedItemsDiv = document.getElementById('selectedItems');
    
    itemsList.innerHTML = '';
    selectedItemsDiv.innerHTML = '';
    
    items.forEach(item => {
        const isSelected = selectedItems.has(item.id);
        const itemElement = createItemElement(item, isSelected);
        
        if (isSelected) {
            selectedItemsDiv.appendChild(itemElement);
        } else {
            itemsList.appendChild(itemElement);
        }
    });
}