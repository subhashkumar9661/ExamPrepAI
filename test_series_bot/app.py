import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# --- CONFIGURATION ---
# PASTE YOUR API KEY BELOW
GOOGLE_API_KEY = "YOUR_API_KEY_HERE"
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Model
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    cls = data.get('class_val')
    subject = data.get('subject')
    chapter = data.get('chapter')

    # Prompt Engineering
    prompt = f"""
    Act as a strict CBSE exam setter. Create a quiz for:
    Class: {cls}
    Subject: {subject}
    Chapters: {chapter}

    Create 5 Multiple Choice Questions (MCQs).
    Output strictly in this JSON format (no markdown, no extra text):
    [
        {{
            "id": 1,
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": "Option A"
        }}
    ]
    """

    try:
        response = model.generate_content(prompt)
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        return clean_text 
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    user_performance = data.get('performance') 

    analysis_prompt = f"""
    Act as a friendly but strict tutor. A student just took a test.
    Here is the data of questions and their answers: {user_performance}

    Please provide a response with:
    1. A score (e.g., 3/5).
    2. A detailed analysis of their weak areas.
    3. Specific advice on what to study in these chapters to get maximum marks next time.
    4. Keep the tone encouraging.
    """

    response = model.generate_content(analysis_prompt)
    return jsonify({"analysis": response.text})

if __name__ == '__main__':
    app.run(debug=True)
