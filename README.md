# Network Intrusion Detection System

A machine learning based **Network Intrusion Detection System (NIDS)** that analyzes network traffic and detects whether the traffic is **Normal** or potentially represents a **Network Attack**.

The project uses the **NSL-KDD dataset**, a Random Forest machine learning model, a FastAPI backend, and a React frontend to provide an interactive network security dashboard.

---

## Project Overview

Network Intrusion Detection Systems are used to monitor network traffic and identify suspicious or malicious activity.

This project implements a machine learning approach where network traffic is represented using **41 features** from the NSL-KDD dataset. The trained Random Forest model analyzes these features and classifies network traffic as:

* 🟢 **Normal**
* 🔴 **Attack**

The trained model is integrated into a FastAPI backend and connected to a React-based frontend dashboard.

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │      User Input     │
                    │   Network Features  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │  Security Dashboard │
                    └──────────┬──────────┘
                               │
                         HTTP POST Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │   /predict endpoint │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Preprocessing    │
                    │ Label Encoding      │
                    │ Standard Scaling    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Random Forest     │
                    │  100 Decision Trees │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Prediction Result   │
                    │ Normal / Attack     │
                    │ Confidence Score    │
                    └─────────────────────┘
```

---

## Machine Learning Model

The project uses a **Random Forest Classifier**.

### Model configuration

| Property             | Value                             |
| -------------------- | --------------------------------- |
| Algorithm            | Random Forest                     |
| Number of estimators | 100                               |
| Dataset              | NSL-KDD                           |
| Input features       | 41                                |
| Classification       | Normal / Attack                   |
| Preprocessing        | Label Encoding + Standard Scaling |

The Random Forest model consists of multiple decision trees whose predictions are combined to produce the final classification.

---

## Dataset

The project uses the **NSL-KDD network intrusion detection dataset**.

NSL-KDD contains network connection records representing different types of network activity and attacks.

The model uses 41 network traffic features, including:

* Duration
* Protocol type
* Service
* Flag
* Source bytes
* Destination bytes
* Login information
* Number of failed logins
* Number of compromised conditions
* Connection count
* Error rates
* Destination host statistics

These features are processed before being passed to the machine learning model.

---

## Machine Learning Pipeline

The machine learning workflow consists of:

### 1. Data preprocessing

Categorical features such as:

```text
protocol_type
service
flag
```

are converted into numerical values using `LabelEncoder`.

### 2. Feature and target separation

The dataset is separated into:

```text
X → Input features
y → Target label
```

### 3. Train-test split

The dataset is divided into training and testing data.

```text
Training data → 80%
Testing data  → 20%
```

### 4. Feature scaling

Numerical features are standardized using:

```text
StandardScaler
```

### 5. Model training

A Random Forest Classifier with 100 estimators is trained using the processed training data.

### 6. Prediction

The trained model predicts whether incoming network traffic is:

```text
Normal
```

or

```text
Attack
```

---

## Project Structure

```text
NIDS-PROJECT/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── model/
│   ├── nids_model.pkl
│   ├── scaler.pkl
│   ├── label_encoders.pkl
│   └── model_features.pkl
│
├── NIDS (1).ipynb
│
├── .gitignore
│
└── README.md
```

---

## Saved Model Files

The trained machine learning pipeline uses several serialized files.

### `nids_model.pkl`

Contains the trained Random Forest model.

### `scaler.pkl`

Contains the fitted StandardScaler used during model training.

### `label_encoders.pkl`

Contains the LabelEncoder objects used for categorical features.

### `model_features.pkl`

Contains the feature information required by the model.

These files allow the trained model to be reused without retraining it every time the backend starts.

---

# Installation and Setup

## Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm
* VS Code
* Jupyter Notebook

---

# Backend Setup

Open a terminal in the project directory.

Navigate to the backend:

```bash
cd backend
```

Activate your Python environment if you are using one.

For Windows:

```bash
..\.venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install fastapi uvicorn pandas numpy scikit-learn joblib
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

---

# API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

The prediction endpoint is:

```text
POST /predict
```

The endpoint receives network traffic features and returns a prediction.

Example response:

```json
{
  "prediction": "Normal",
  "confidence": 100
}
```

---

# Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Dashboard Features

The React dashboard provides:

* Network traffic input
* Protocol selection
* Service selection
* Connection flag selection
* Network feature configuration
* Machine learning model information
* Model status
* Detection pipeline visualization
* Attack/Normal classification
* Prediction confidence
* Reset functionality
* FastAPI backend integration

---

# Example Prediction

Example network traffic input:

```json
{
  "duration": 0,
  "protocol_type": "tcp",
  "service": "ftp_data",
  "flag": "SF",
  "src_bytes": 491,
  "dst_bytes": 0
}
```

The system processes the complete set of network features and sends them to the Random Forest model.

Example output:

```json
{
  "prediction": "Normal",
  "confidence": 100
}
```

---

# Technologies Used

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Jupyter Notebook

### Backend

* FastAPI
* Uvicorn
* Python

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite

### Dataset

* NSL-KDD

---

# Objectives

The main objectives of this project are:

1. Detect malicious network traffic using machine learning.
2. Build a reusable trained intrusion detection model.
3. Deploy the model through a REST API.
4. Develop an interactive security dashboard.
5. Provide real-time predictions and confidence scores.
6. Demonstrate the integration of machine learning with cybersecurity applications.

---

# Future Enhancements

Possible future improvements include:

* Real-time packet capture using Wireshark or Scapy
* Live network traffic monitoring
* Attack-type classification
* Prediction history
* Interactive traffic charts
* Model performance dashboard
* Authentication for the API
* Database integration
* Deployment to a cloud platform
* Automated security alerts
* Email or notification-based threat alerts

---

# Project

Network Intrusion Detection System

Built as a cybersecurity and machine learning project using the NSL-KDD dataset.

# Author
Swetha Ulaganathan Jayachitra


