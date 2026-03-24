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
            <small>${p.stock} stock</small>
        </div>`;
    });
    document.getElementById("products").innerHTML = html;
});

// ADD TO CART
function addToCart(p){
    cart.push(p);
    updateReceipt();

    // ✅ AUTO SCROLL TO RECEIPT
    document.getElementById("bill").scrollIntoView({
        behavior: "smooth"
    });

    // ✅ HIGHLIGHT EFFECT
    document.getElementById("bill").classList.add("active");
    setTimeout(()=>{
        document.getElementById("bill").classList.remove("active");
    },1000);
}

// UPDATE RECEIPT
function updateReceipt(){
    let html = `
    <table>
    <tr>
        <th>Item</th>
        <th>Price</th>
    </tr>`;

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
        html += `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
        </tr>`;
    });

    html += `</table>`;

    let tax = subtotal * 0.08;
    let total = subtotal + tax;

    document.getElementById("receipt").innerHTML = html;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// COMPLETE SALE
function completeSale(){

    let receiptText = "------ RECEIPT ------\n";
    let total = 0;

    cart.forEach(i => {
        receiptText += i.name + " - $" + i.price + "\n";
        total += i.price;
    });

    let tax = total * 0.08;
    total += tax;

    receiptText += "---------------------\n";
    receiptText += "Tax: $" + tax.toFixed(2) + "\n";
    receiptText += "Total: $" + total.toFixed(2);

    alert(receiptText);

    cart = [];
    updateReceipt();
}