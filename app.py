from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Bill API
@app.route('/bill', methods=['POST'])
def bill():
    data = request.json

    items = data.get("items", [])
    total = sum(item['price'] * item['qty'] for item in items)

    return jsonify({
        "items": items,
        "total": total
    })

if __name__ == "__main__":
    app.run(debug=True)