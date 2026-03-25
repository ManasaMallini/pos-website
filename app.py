from flask import Flask, render_template, jsonify

app = Flask(__name__)

# ─── FRONTEND PAGES ─────────────────────────

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/inventory")
def inventory():
    return render_template("inventory.html")

@app.route("/procurement")
def procurement():
    return render_template("procurement.html")

# 🔥 FIX (IMPORTANT)
@app.route('/api/products')
def get_products():
    return jsonify([
        {"name":"Coffee","price":10,"stock":50},
        {"name":"Speaker","price":80,"stock":20},
        {"name":"Olive Oil","price":18,"stock":0},
        {"name":"Chocolate","price":32,"stock":10}
    ])

if __name__ == "__main__":
    app.run()
