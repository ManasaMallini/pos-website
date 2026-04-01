
import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from supabase import create_client

app = Flask(__name__)
CORS(app)

# Supabase config
url = "https://lchsnqstnmfuhiolrufq.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaHNucXN0bm1mdWhpb2xydWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjg3MTYsImV4cCI6MjA4OTgwNDcxNn0.ZvSLwRG1t30ine5P05eRvuzxiGWXFBM8Qi1rxkYNG28"

supabase = create_client(url, key)

# ───────── FRONTEND ROUTES ─────────
@app.route("/")
def sales():
    return render_template("index.html")

@app.route("/inventory")
def inventory():
    return render_template("inventory.html")

@app.route("/procurement")
def procurement():
    return render_template("procurement.html")


# ───────── PRODUCTS API ─────────
@app.route("/api/products/all", methods=["GET"])
def get_products():
    try:
        res = supabase.table("products").select("*").execute()
        return jsonify(res.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/products", methods=["POST"])
def add_product():
    try:
        data = request.get_json()
        print("PRODUCT DATA:", data)   # 🔥 debug

        name = data.get("name")
        price = data.get("price")
        stock = data.get("stock")
        supplier = data.get("supplier", "")

        if not name or not price or not stock:
            return jsonify({"error": "Missing fields"}), 400

        result = supabase.table("products").insert({
            "name": name,
            "price": float(price),
            "stock": int(stock),
            "supplier": supplier
        }).execute()

        return jsonify(result.data)

    except Exception as e:
        print("PRODUCT ERROR:", e)
        return jsonify({"error": str(e)}), 500

# ───────── ORDERS API ─────────
@app.route("/api/orders", methods=["POST"])
def create_order():
    try:
        data = request.get_json()

        print("DATA RECEIVED:", data)  # 🔥 debug

        res = supabase.table("orders").insert({
            "total": data["total"],
            "payment_method": data.get("payment_method","Cash"),
            "items": data.get("items", [])
        }).execute()

        return jsonify(res.data)

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
    # SUPPLIERS API
# 🔥 SUPPLIERS (STATIC DATA)
@app.route("/api/suppliers", methods=["GET"])
def get_suppliers():
    return jsonify([
        {"name":"FreshFarm Distributors","location":"India","contact":"+91 9876543210"},
        {"name":"TechVault Supply Co.","location":"USA","contact":"+1 234567890"},
        {"name":"Global Goods Inc.","location":"UK","contact":"+44 987654321"},
        {"name":"Premium Packaging Ltd.","location":"Germany","contact":"+49 123456789"}
    ])


# 🔥 ORDERS (STATIC DATA)
@app.route("/api/orders/all", methods=["GET"])
def get_orders():
    return jsonify([
        {"id":"ORD001","total":500,"payment_method":"Cash","created_at":"2026-03-25"},
        {"id":"ORD002","total":1200,"payment_method":"Card","created_at":"2026-03-26"},
        {"id":"ORD003","total":300,"payment_method":"UPI","created_at":"2026-03-27"}
    ])

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
