let cart = [];

// LOAD PRODUCTS
fetch('/api/products')
.then(res => res.json())
.then(data => {
    let html = '';
    data.forEach(p => {
        html += `
        <div class="product-card" onclick='addToCart(${JSON.stringify(p)})'>
            <h4>${p.name}</h4>
            <p>$${p.price}</p>
        </div>`;
    });
    document.getElementById("products").innerHTML = html;
});

// ADD TO CART
function addToCart(product){
    cart.push(product);
    updateReceipt();
}

// UPDATE RECEIPT
function updateReceipt(){
    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
        html += `<p>${item.name} - $${item.price}</p>`;
    });

    let tax = subtotal * 0.08;
    let total = subtotal + tax;

    document.getElementById("receipt").innerHTML = html;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// COMPLETE SALE
function completeSale(){
    alert("Payment Successful ✅");
    cart = [];
    updateReceipt();
}
