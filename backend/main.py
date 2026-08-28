from fastapi import FastAPI
import joblib
import os
from pydantic import BaseModel
from typing import Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Network Intrusion Detection System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------
# Load trained ML components
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "model")

model = joblib.load(os.path.join(MODEL_DIR, "nids_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
label_encoders = joblib.load(
    os.path.join(MODEL_DIR, "label_encoders.pkl")
)
feature_names = joblib.load(
    os.path.join(MODEL_DIR, "feature_names.pkl")
)


@app.get("/")
def home():
    return {
        "message": "NIDS API is running!"
    }


@app.get("/model-info")
def model_info():
    return {
        "model": "Random Forest",
        "features": len(feature_names),
        "feature_names": feature_names
    }
class NetworkTraffic(BaseModel):
    duration: float
    protocol_type: str
    service: str
    flag: str
    src_bytes: float
    dst_bytes: float
    land: float
    wrong_fragment: float
    urgent: float
    hot: float
    num_failed_logins: float
    logged_in: float
    num_compromised: float
    root_shell: float
    su_attempted: float
    num_root: float
    num_file_creations: float
    num_shells: float
    num_access_files: float
    num_outbound_cmds: float
    is_host_login: float
    is_guest_login: float
    count: float
    srv_count: float
    serror_rate: float
    srv_serror_rate: float
    rerror_rate: float
    srv_rerror_rate: float
    same_srv_rate: float
    diff_srv_rate: float
    srv_diff_host_rate: float
    dst_host_count: float
    dst_host_srv_count: float
    dst_host_same_srv_rate: float
    dst_host_diff_srv_rate: float
    dst_host_same_src_port_rate: float
    dst_host_srv_diff_host_rate: float
    dst_host_serror_rate: float
    dst_host_srv_serror_rate: float
    dst_host_rerror_rate: float
    dst_host_srv_rerror_rate: float
@app.post("/predict")
def predict(data: NetworkTraffic):

    input_data = data.model_dump()

    # Convert categorical values using saved LabelEncoders
    for column, encoder in label_encoders.items():
        input_data[column] = encoder.transform([input_data[column]])[0]

    # Arrange features in the exact order used during training
    input_values = [
        input_data[feature]
        for feature in feature_names
    ]

    # Scale the input
    input_scaled = scaler.transform([input_values])

    # Make prediction
    prediction = model.predict(input_scaled)[0]

    # Get probability
    probability = model.predict_proba(input_scaled)[0]

    confidence = float(max(probability))

    if prediction == 0:
        result = "Normal"
    else:
        result = "Attack"

    return {
        "prediction": result,
        "confidence": round(confidence * 100, 2)
    }