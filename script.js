
function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}

//
// ---------------- Suppliers ----------------
//
function addSupplier() {
    let name = document.getElementById("supplierName").value.trim();

    if (!name) {
        alert("Please enter supplier name");
        return;
    }

    fetch('/api/suppliers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(() => {
        loadSuppliers();
        document.getElementById("supplierName").value = "";
    })
    .catch(err => console.error("Error:", err));
}

function loadSuppliers() {
    fetch('/api/suppliers')
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("supplierList");

            if (!data || data.length === 0) {
                list.innerHTML = "<p>No suppliers found</p>";
                return;
            }

            list.innerHTML = data.map(s => `<p>${s.name}</p>`).join('');
        })
        .catch(err => console.error("Load suppliers error:", err));
}

//
// ---------------- Products ----------------
//
function addProduct() {
    let name = document.getElementById("productName").value.trim();
    let price = document.getElementById("productPrice").value.trim();

    if (!name || !price) {
        alert("Please enter product name and price");
        return;
    }

    fetch('/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, price})
    })
    .then(res => res.json())
    .then(() => {
        loadProducts();
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
    })
    .catch(err => console.error("Error:", err));
}

function loadProducts() {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("productList");

            if (!data || data.length === 0) {
                list.innerHTML = "<p>No products found</p>";
                return;
            }

            list.innerHTML = data.map(p => `<p>${p.name} - ₹${p.price}</p>`).join('');
        })
        .catch(err => console.error("Load products error:", err));
}

//
// ---------------- Sales ----------------
//
function addSale() {
    let item = document.getElementById("saleItem").value.trim();
    let amount = document.getElementById("saleAmount").value.trim();

    if (!item || !amount) {
        alert("Please enter item and amount");
        return;
    }

    fetch('/api/sales', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item, amount})
    })
    .then(res => res.json())
    .then(() => {
        loadSales();
        document.getElementById("saleItem").value = "";
        document.getElementById("saleAmount").value = "";
    })
    .catch(err => console.error("Error:", err));
}

function loadSales() {
    fetch('/api/sales')
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("salesList");

            if (!data || data.length === 0) {
                list.innerHTML = "<p>No sales found</p>";
                return;
            }

            list.innerHTML = data.map(s => `<p>${s.item} - ₹${s.amount}</p>`).join('');
        })
        .catch(err => console.error("Load sales error:", err));
}

//
// ---------------- Initial Load ----------------
//
window.onload = function() {
    loadSuppliers();
    loadProducts();
    loadSales();
};