let cart = [];

// Load products from backend
fetch('/api/products/all')
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
    // check if product already in cart
    let found = cart.find(i => i.name === name);
    if(found){
        found.qty += 1;
    } else {
        cart.push({name, price, qty:1});
    }
    updateCart();
}

function updateCart(){
    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        html += `<p>${item.name} x${item.qty} - ₹${(item.price*item.qty).toFixed(2)}</p>`;
    });
    

    let tax = subtotal * 0.10;
    let total = subtotal + tax;

    document.getElementById("cart").innerHTML = html || "No items";
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Complete sale & save order to Supabase
async function completeSale(){
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.qty);
    let tax = subtotal * 0.10;
    let total = subtotal + tax;

    // Send order to backend
    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ total: total, payment_method: "Cash" })
        });

        const data = await res.json();

        if(res.ok){
            alert(`Sale Completed ✅\nOrder ID: ${data.order_id}\nTotal: ₹${total.toFixed(2)}`);
            cart = [];
            updateCart();
        } else {
            alert("Error saving order: " + JSON.stringify(data));
        }
    } catch(err){
        alert("Network error: " + err.message);
    }
}
body: JSON.stringify({
    total: total,
    payment_method: "Cash",
    items: cart
})
