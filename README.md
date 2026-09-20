# Digital Wellbeing Risk Predictor

An end-to-end Machine Learning web application that analyzes users' digital habits and predicts digital wellbeing risk using a Random Forest classification model.

## 🖥️ Application Preview

![Digital Wellbeing Risk Predictor Dashboard](dashboard.png)

## 📌 Project Overview

Excessive screen time, social media usage, frequent app checking, gaming, lack of sleep, and digital distractions can affect a person's daily routine.

This project uses Machine Learning to analyze these digital behavior patterns and provide a digital wellbeing risk estimate.

The application allows users to enter their digital habits through an interactive web interface and receive a prediction with a probability score and personalized suggestions.

> **Note:** This project is an educational digital wellbeing awareness tool and is not a medical diagnostic system.

## ✨ Features

- Digital habit-based risk prediction
- Random Forest classification model
- Data preprocessing and categorical encoding
- Exploratory Data Analysis (EDA)
- Comparison of multiple Machine Learning models
- Accuracy, Precision, Recall and F1 evaluation
- Interactive Flask backend
- Responsive web frontend
- Digital profile summary
- Risk visualization
- Personalized wellbeing suggestions
- Model performance information

## 🧠 Machine Learning

Three classification algorithms were trained and compared:

| Model | Accuracy | Precision | Recall | F1 Score |
|---|---:|---:|---:|---:|
| Logistic Regression | 89.47% | 91.09% | 94.35% | 92.69% |
| Decision Tree | 93.07% | 93.94% | 96.42% | 95.17% |
| Random Forest | 93.87% | 96.72% | 94.54% | 95.62% |

The Random Forest model was selected for the web application based on the evaluation results.

## 📊 Dataset

The dataset contains 7,500 records and includes digital behavior features such as:

- Age
- Gender
- Daily screen time
- Social media usage
- Gaming hours
- Work/study hours
- Sleep duration
- Notifications per day
- App opens per day
- Weekend screen time
- Stress level
- Academic/work impact

The target variable is `addicted_label`.

## 🛠️ Technologies Used

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Matplotlib

### Backend
- Flask
- Flask-CORS

### Frontend
- HTML
- CSS
- JavaScript

### Development
- Jupyter Notebook
- VS Code
- GitHub

## 📁 Project Structure

```text
Digital-Wellbeing-Risk-Predictor/
│
├── dataset/
│   └── Smartphone_Usage_And_Addiction_Analysis_7500_Rows.csv
│
├── notebooks/
│   └── model_training.ipynb
│
├── models/
│   ├── random_forest_model.pkl
│   └── preprocessor.pkl
│
├── backend/
│   └── app.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── requirements.txt
