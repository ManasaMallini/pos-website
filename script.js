let cart = [];

// Load products
fetch('/api/products')
.then(res => res.json())
.then(data => {
    let html = "";
    data.forEach(p => {
        html += `
        <div class="card" onclick="addToCart('${p.name}', ${p.price})">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
        </div>`;
    });
    document.getElementById("products").innerHTML = html;
});

function addToCart(name, price){
    cart.push({name, price});
    updateCart();
}

function updateCart(){
    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
        html += `<p>${item.name} - ₹${item.price}</p>`;
    });

    let tax = subtotal * 0.10;
    let total = subtotal + tax;

    document.getElementById("cart").innerHTML = html || "No items";
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

function completeSale(){
    alert("Sale Completed ✅");
    cart = [];
    updateCart();
}
