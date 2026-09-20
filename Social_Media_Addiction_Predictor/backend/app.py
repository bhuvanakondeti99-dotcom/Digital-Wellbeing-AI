from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Enable CORS so frontend (port 5500) can communicate with Flask (port 5000)
CORS(app)

# Get project root folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Model paths
model_path = os.path.join(
    BASE_DIR,
    "models",
    "random_forest_model.pkl"
)

preprocessor_path = os.path.join(
    BASE_DIR,
    "models",
    "preprocessor.pkl"
)

# Load model and preprocessing pipeline
model = joblib.load(model_path)
preprocessor = joblib.load(preprocessor_path)


@app.route("/")
def home():
    return "Social Media Addiction Risk Predictor API is running!"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    # Convert input into DataFrame
    input_data = pd.DataFrame([data])

    # Apply preprocessing
    processed_data = preprocessor.transform(input_data)

    # Make prediction
    prediction = model.predict(processed_data)[0]

    # Get probability
    probability = model.predict_proba(processed_data)[0][1]

    # Convert prediction into readable result
    if prediction == 1:
        risk = "High Risk"
    else:
        risk = "Low Risk"

    return jsonify({
        "prediction": int(prediction),
        "risk": risk,
        "probability": round(float(probability) * 100, 2)
    })


if __name__ == "__main__":
    app.run(debug=True)