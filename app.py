from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# HOME (Billing Page)
@app.route('/')
def home():
    return render_template("index.html")

# INVENTORY
@app.route('/inventory')
def inventory():
    return render_template("inventory.html")

# PRODUCTS
@app.route('/products')
def products():
    return render_template("products.html")

# PROCUREMENT
@app.route('/procurement')
def procurement():
    return render_template("procurement.html")

# 🔥 IMPORTANT FIX (API for products)
@app.route('/api/products')
def get_products():
    return jsonify([
        {"name":"Coffee","price":10,"stock":50},
        {"name":"Speaker","price":80,"stock":20},
        {"name":"Olive Oil","price":18,"stock":0},
        {"name":"Chocolate","price":32,"stock":10}
    ])

# RUN
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
