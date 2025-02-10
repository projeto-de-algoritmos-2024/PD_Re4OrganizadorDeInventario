let items = [
    { id: 1, name: 'Pistola', weight: 2, value: 8, image: 'assets/images/handgun.png' },
    { id: 2, name: 'Espingarda', weight: 4, value: 10, image: 'assets/images/RE4R_W-870.png' },
    { id: 3, name: 'Ervas Verdes', weight: 1, value: 5, image: 'assets/images/Green.png' },
    { id: 4, name: 'Granada', weight: 1, value: 6, image: 'assets/images/RE4R_Hand_Grenade.png' },
    { id: 5, name: 'Munição Pistola', weight: 1, value: 4, image: 'assets/images/RE4R_Handgun_Ammo.png' },
    { id: 6, name: 'Munição Espingarda', weight: 2, value: 5, image: 'assets/images/RE4R_Shotgun_Shells.png' },
    { id: 7, name: 'Spray Primeiro Socorros', weight: 2, value: 7, image: 'assets/images/RE4R_First_Aid_Spray.png' },
    { id: 8, name: 'Faca', weight: 1, value: 3, image: 'assets/images/RE4R_Combat_Knife.png' }
];

let selectedItems = new Set();

function createItemElement(item, isSelected) {
    const div = document.createElement('div');
    div.className = `item ${isSelected ? 'selected' : ''}`;
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg=='">
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
    const currentWeight = document.getElementById('currentWeight');

    itemsList.innerHTML = '';
    selectedItemsDiv.innerHTML = '';

    let totalWeight = 0;

    items.forEach(item => {
        const isSelected = selectedItems.has(item.id);
        const itemElement = createItemElement(item, isSelected);

        if (isSelected) {
            selectedItemsDiv.appendChild(itemElement);
            totalWeight += item.weight;
        } else {
            itemsList.appendChild(itemElement);
        }
    });

    currentWeight.textContent = totalWeight;
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

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        getBase64Image(file).then(base64Image => {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${base64Image}" alt="Preview">`;
        });
    }
}

async function addNewItem(event) {
    event.preventDefault();

    const name = document.getElementById('itemName').value;
    const weight = parseInt(document.getElementById('itemWeight').value);
    const value = parseInt(document.getElementById('itemValue').value);
    const imageFile = document.getElementById('itemImage').files[0];

    let imageData = '';
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

    calculateOptimalInventory();

    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    document.getElementById('itemImage').addEventListener('change', previewImage);
});