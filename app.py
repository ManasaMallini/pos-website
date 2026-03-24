from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

suppliers = []
products = []
cart = []
history = []

@app.route('/')
def home():
    return render_template("index.html")

# SUPPLIERS
@app.route('/api/suppliers', methods=['GET','POST'])
def suppliers_api():
    if request.method == 'POST':
        suppliers.append(request.json)
        return jsonify({"msg":"added"})
    return jsonify(suppliers)

# PRODUCTS
@app.route('/api/products', methods=['GET','POST'])
def products_api():
    if request.method == 'POST':
        products.append(request.json)
        return jsonify({"msg":"added"})
    return jsonify(products)

# CART
@app.route('/api/cart', methods=['GET','POST','DELETE'])
def cart_api():
    if request.method == 'POST':
        cart.append(request.json)
        return jsonify({"msg":"added"})
    if request.method == 'DELETE':
        cart.clear()
        return jsonify({"msg":"cleared"})
    return jsonify(cart)

# HISTORY
@app.route('/api/history', methods=['GET','POST'])
def history_api():
    if request.method == 'POST':
        history.append(request.json)
        return jsonify({"msg":"saved"})
    return jsonify(history)

if __name__ == '__main__':
    app.run(debug=True)