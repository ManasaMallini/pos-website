from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")  
CORS(app)

# SUPABASE CONFIG (WORKING)
url = "https://lchsnqstnmfuhiolrufq.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaHNucXN0bm1mdWhpb2xydWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjg3MTYsImV4cCI6MjA4OTgwNDcxNn0.ZvSLwRG1t30ine5P05eRvuzxiGWXFBM8Qi1rxkYNG28"

supabase = create_client(url, key)

# ───────── FRONTEND ROUTES ─────────

@app.route("/")
def index():
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

        payload = {
            "name": data.get("name"),
            "price": float(data.get("price", 0)),
            "stock": int(data.get("stock", 0)),
            "is_active": True
        }

        res = supabase.table("products").insert(payload).execute()

        return jsonify(res.data), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ───────── ORDERS API (BASIC) ─────────

@app.route("/api/orders", methods=["POST"])
def create_order():
    try:
        data = request.get_json()

        res = supabase.table("orders").insert({
            "total": data.get("total"),
            "payment_method": "Cash"
        }).execute()

        return jsonify(res.data), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ───────── ERROR HANDLER ─────────

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500


# ───────── RUN ─────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
