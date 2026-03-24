from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
    {"id":1,"name":"Organic Coffee Beans 1kg","price":24.99,"stock":145},
    {"id":2,"name":"Wireless Bluetooth Speaker","price":79.99,"stock":38},
    {"id":3,"name":"USB-C Hub Adapter","price":34.99,"stock":72},
    {"id":4,"name":"Artisan Chocolate Box","price":32.99,"stock":8},
    {"id":5,"name":"Eco-Friendly Tote Bag","price":12.99,"stock":230},
    {"id":6,"name":"Stainless Steel Tumbler","price":27.99,"stock":56},
    {"id":7,"name":"Herbal Tea Collection","price":15.99,"stock":3}
]

cart_history = []

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/inventory')
def inventory():
    return render_template("inventory.html")

@app.route('/products')
def products_page():
    return render_template("products.html")
@app.route('/procurement')
def procurement():
    return render_template("procurement.html")

@app.route('/api/products')
def get_products():
    return jsonify(products)

@app.route('/api/sale', methods=['POST'])
def sale():
    data = request.json
    cart_history.append(data)
    return jsonify({"status":"success"})

if __name__ == "__main__":
    app.run(debug=True)