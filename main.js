const loginSection = document.getElementById('login-section');
const productsSection = document.getElementById('products-section');
const loginBtn = document.getElementById('login-btn');
const addProductBtn = document.getElementById('add-product-btn');
const productsList = document.getElementById('products-list');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const saveProductBtn = document.getElementById('save-product-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const loadingIndicator = document.getElementById('loading');

const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput = document.getElementById('product-quantity');
const productImageInput = document.getElementById('product-image');

let products = [];
let editingProductId = null;

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'aaa' && password === '123') {
        loginSection.classList.add('hidden');
        productsSection.classList.remove('hidden');
        loadProducts();
    } else {
        alert('Invalid credentials!');
    }
});

function loadProducts() {
    loadingIndicator.classList.remove('hidden');
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');
        renderProducts();
    }, 1000);
}

function renderProducts() {
    productsList.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2 border">${index + 1}</td>
            <td class="p-2 border"><img src="${product.image}" alt="Product Image" class="w-12 h-12 object-cover"></td>
            <td class="p-2 border">${product.name}</td>
            <td class="p-2 border">${product.price}</td>
            <td class="p-2 border">${product.quantity}</td>
            <td class="p-2 border">
                <button onclick="editProduct(${product.id})" class="text-blue-500 mr-2">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="text-red-500">Delete</button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

addProductBtn.addEventListener('click', () => {
    openModal('Add Product');
});

function openModal(title) {
    modalTitle.textContent = title;
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
    productImageInput.value = '';
    productModal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
    editingProductId = null;
});

saveProductBtn.addEventListener('click', () => {
    const name = productNameInput.value;
    const price = productPriceInput.value;
    const quantity = productQuantityInput.value;
    const image = productImageInput.value;

    if (!name || !price || !quantity || !image) {
        alert('All fields are required!');
        return;
    }

    if (editingProductId !== null) {
        const product = products.find(p => p.id === editingProductId);
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.image = image;
    } else {
        products.push({
            id: Date.now(),
            name,
            price,
            quantity,
            image
        });
    }

    renderProducts();
    productModal.classList.add('hidden');
    editingProductId = null;
});

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productQuantityInput.value = product.quantity;
        productImageInput.value = product.image;
        editingProductId = id;
        openModal('Edit Product');
    }
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}
