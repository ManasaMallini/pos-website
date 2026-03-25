from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SAMPLE PRODUCTS
products = [
    {"id": 1, "name": "Coffee Beans 1kg", "price": 24.99, "stock": 10},
    {"id": 2, "name": "Bluetooth Speaker", "price": 79.99, "stock": 5},
    {"id": 3, "name": "USB-C Adapter", "price": 34.99, "stock": 8},
    {"id": 4, "name": "Chocolate Box", "price": 32.99, "stock": 6},
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/products")
def get_products():
    return jsonify(products)

if __name__ == "__main__":
    app.run()
