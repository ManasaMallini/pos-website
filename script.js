function showSection(s){
    document.querySelectorAll('.section').forEach(x=>x.classList.remove('active'));
    document.getElementById(s).classList.add('active');
}

/* SUPPLIERS */
function addSupplier(){
    let name = supplierInput.value;

    fetch('/api/suppliers',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name})
    }).then(loadSuppliers);
}

function loadSuppliers(){
    fetch('/api/suppliers')
    .then(res=>res.json())
    .then(data=>{
        supplierList.innerHTML=data.map((s,i)=>
        `<div class="card">${s.name}</div>`).join('');
    });
}

/* PRODUCTS */
function addProduct(){
    let name=productName.value;
    let price=productPrice.value;

    fetch('/api/products',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,price})
    }).then(loadProducts);
}

function loadProducts(){
    fetch('/api/products')
    .then(res=>res.json())
    .then(data=>{
        productList.innerHTML=data.map((p,i)=>
        `<div class="card">${p.name}-₹${p.price}</div>`).join('');

        productSelect.innerHTML=data.map((p,i)=>
        `<option value="${i}">${p.name}</option>`).join('');

        productCount.innerText="Total Products: "+data.length;
    });
}

/* CART */
function addToCart(){
    let index=productSelect.value;
    let qty=quantity.value;

    fetch('/api/products')
    .then(res=>res.json())
    .then(products=>{
        let p=products[index];

        fetch('/api/cart',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:p.name,price:p.price,qty})
        }).then(loadCart);
    });
}

function loadCart(){
    fetch('/api/cart')
    .then(res=>res.json())
    .then(cart=>{
        cartList.innerHTML=cart.map((c,i)=>
        `<div class="card">${c.name} x ${c.qty} = ₹${c.price*c.qty}</div>`).join('');

        let total=0;
        let discount=document.getElementById("discount").value||0;

        let billHTML=`<h2>My Store</h2>
        <p>${new Date().toLocaleString()}</p>
        <p>Customer: ${customerName.value}</p><h3>🧾 BILL</h3>`;

        cart.forEach(c=>{
            let t=c.price*c.qty;
            total+=t;
            billHTML+=`${c.name} x ${c.qty} = ₹${t}<br>`;
        });

        let final=total-(total*discount/100);

        billHTML+="<hr>";
        billHTML+=`<p>Subtotal: ₹${total}</p>`;
        billHTML+=`<p>Discount: ${discount}%</p>`;
        billHTML+=`<h2 class="total">Final Total: ₹${final}</h2>`;

        billBox.innerHTML=billHTML;
    });
}

/* CHECKOUT */
function checkout(){
    fetch('/api/cart')
    .then(res=>res.json())
    .then(cart=>{
        fetch('/api/history',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(cart)
        }).then(()=>{
            fetch('/api/cart',{method:'DELETE'}).then(()=>{
                loadCart();
                loadHistory();
                alert("Bill Saved!");
            });
        });
    });
}

/* HISTORY */
function loadHistory(){
    fetch('/api/history')
    .then(res=>res.json())
    .then(data=>{
        historyList.innerHTML=data.map(h=>
        `<div class="bill">${JSON.stringify(h)}</div>`).join('');
    });
}

/* PRINT */
function printBill(){
    let content=billBox.innerHTML;
    let w=window.open();
    w.document.write(content);
    w.print();
}

/* INIT */
loadSuppliers();
loadProducts();
loadCart();
loadHistory();