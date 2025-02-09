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

    function addNewItem(event) {
        event.preventDefault();
        const name = document.getElementById('itemName').value;
        const weight = parseInt(document.getElementById('itemWeight').value);
        const value = parseInt(document.getElementById('itemValue').value);
        const newItem = {
            id: items.length + 1,
            name: name,
            weight: weight,
            value: value,
            image: 'assets/images/default.png'
        };
        items.push(newItem);
        document.getElementById('addItemForm').reset();
        updateDisplay(); return false;
    }
}

function knapsack(items, maxWeight) {
    const n = items.length;
    const dp = Array(n + 1).fill().map(() => Array(maxWeight + 1).fill(0));
    const selected = new Set();
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= maxWeight; w++) {
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(
                    items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    let w = maxWeight;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selected.add(items[i - 1].id);
            w -= items[i - 1].weight;
        }
    }
    return selected;
}
function calculateOptimalInventory() {
    const maxWeight = parseInt(document.getElementById('maxWeight').value);
    selectedItems = knapsack(items, maxWeight);
    updateDisplay();
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
async function addNewItem(event) {
    event.preventDefault();
    const name = document.getElementById('itemName').value;
    const weight = parseInt(document.getElementById('itemWeight').value);
    const value = parseInt(document.getElementById('itemValue').value);
    const imageFile = document.getElementById('itemImage').files[0]; let imageData = '';
    if (imageFile) {
        imageData = await getBase64Image(imageFile);
    }
    const newItem = {
        id: items.length + 1,
        name: name,
        weight: weight,
        value: value,
        image: imageData
    };
    items.push(newItem);
    document.getElementById('addItemForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    updateDisplay();
    return false;
}