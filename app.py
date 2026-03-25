from flask import Flask, render_template, jsonify

app = Flask(__name__)

# HOME
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

# 🔥 PRODUCTS API (VERY IMPORTANT)
@app.route('/api/products')
def get_products():
    return jsonify([
        {"name":"Coffee","price":10,"stock":50},
        {"name":"Speaker","price":80,"stock":20},
        {"name":"Olive Oil","price":18,"stock":0},
        {"name":"Chocolate","price":32,"stock":10}
    ])

# 🔥 RUN (Render kosam)
if __name__ == "__main__":
    app.run()
