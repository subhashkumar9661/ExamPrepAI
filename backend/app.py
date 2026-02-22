import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

app = Flask(__name__)

# ✅ Force correct path to .env
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

print("ENV FILE PATH:", env_path)

API_KEY = os.getenv("API_KEY")
print("Loaded KEY:", repr(API_KEY))

if not API_KEY:
    raise ValueError("❌ API_KEY not found. Check your .env file")

client = genai.Client(api_key=API_KEY)

print("✅ API Key Loaded Successfully")

# -- SYLLABUS ---
SYLLABUS_DB = {
    "Class 8": {
        "Maths": ["Rational Numbers", "Linear Equations", "Understanding Quadrilaterals", "Practical Geometry", "Data Handling", "Squares and Square Roots", "Cubes and Cube Roots", "Comparing Quantities", "Algebraic Expressions", "Visualising Solid Shapes", "Mensuration", "Exponents and Powers", "Direct and Inverse Proportions", "Factorisation", "Introduction to Graphs", "Playing with Numbers"],
        "Science": ["Crop Production", "Microorganisms", "Coal and Petroleum", "Combustion and Flame", "Conservation of Plants", "Reproduction in Animals", "Adolescence", "Force and Pressure", "Friction", "Sound", "Chemical Effects of Current", "Natural Phenomena", "Light"],
        "SST": ["Resources", "Land Soil Water", "Agriculture", "Industries", "Human Resources", "The Constitution", "Secularism", "Judiciary", "Social Justice", "Trade to Territory", "Ruling the Countryside", "When People Rebel", "National Movement"],
        "English": ["The Best Christmas Present", "The Tsunami", "Glimpses of the Past", "Bepin Choudhury", "The Summit Within", "Jody's Fawn", "Visit to Cambridge", "Monsoon Diary"],
        "Computer": ["Networking Concepts", "Introduction to Cyber Ethics", "Introduction to Spreadsheets", "Introduction to Database", "Introduction to Python", "App Development Basics", "Digital Communication"],
        "Sanskrit": ["सुभाषितानि", "बिलस्य वाणी न कदापि मे श्रुता", "डिजिटल इंडिया", "सदैव पुरतो निधेहि चरणम्", "कण्टकेनैव कण्टकम्", "गृहं शून्यं सुतां विना", "भारतजनताऽहम्", "संसारसागरस्य नायकाः", "सप्तभगिन्यः"],
        "Hindi": ["ध्वनि", "लाख की चूड़ियाँ", "बस की यात्रा", "दीवानों की हस्ती", "चिट्ठियों की अनूठी दुनिया", "भगवान के डाकिए", "क्या निराश हुआ जाए", "यह सबसे कठिन समय नहीं", "कबीर की साखियाँ", "कामचोर", "जब सिनेमा ने बोलना सीखा", "सुदामा चरित", "जहाँ पहिया है", "अकबरी लोटा", "सूर के पद", "पानी की कहानी", "बाज और साँप", "टोपी"]
    },
    "Class 9": {
        "Maths": ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations", "Lines and Angles", "Triangles", "Quadrilaterals", "Circles", "Heron's Formula", "Surface Areas", "Statistics"],
        "Science": ["Matter in Our Surroundings", "Is Matter Pure", "Atoms and Molecules", "Structure of Atom", "Cell: Fundamental Unit", "Tissues", "Motion", "Force and Laws", "Gravitation", "Work and Energy", "Sound", "Food Resources"],
        "SST": ["India Size Location", "Physical Features", "Drainage", "Climate", "Natural Vegetation", "Population", "French Revolution", "Socialism & Russian Revolution", "Nazism", "Democracy", "Electoral Politics", "Democratic Rights"],
        "English": ["The Fun They Had", "Sound of Music", "The Little Girl", "Beautiful Mind", "Snake and the Mirror", "My Childhood", "Reach for the Top", "Kathmandu", "If I Were You"],
        "Sanskrit": ["भारतीवसन्तगीतम्", "स्वर्णकाकः", "गोदोहनम्", "सूक्तिमौक्तिकम्", "भ्रान्तो बालः", "लोहमार्गेण", "सिकतासेतुः", "जटायोः शौर्यम्", "पर्यावरणम्", "वाङ्मनःप्राणस्वरूपम्"],
        "Computer": ["Introduction to IT–ITeS Industry", "Data Entry & Keyboarding Skills", "Digital Documentation (Advanced)", "Electronic Spreadsheet (Advanced)", "Digital Presentation (Advanced)", "Introduction to Python", "Employability Skills"],
        "Hindi": ["दो बैलों की कथा", "ल्हासा की ओर", "उपभोक्तावाद की संस्कृति", "साँवले सपनों की याद", "नाना साहब की पुत्री", "प्रेमचंद के फटे जूते", "मेरे बचपन के दिन", "एक कुत्ता और एक मैना", "कबीर", "मीरा", "सुमित्रानंदन पंत", "हरिवंश राय बच्चन"]
    },
    "Class 10": {
        "Maths": ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "AP", "Triangles", "Coordinate Geometry", "Trigonometry", "Applications of Trig", "Circles", "Area Related to Circles", "Surface Areas", "Statistics", "Probability"],
        "Science": ["Chemical Reactions", "Acids Bases Salts", "Metals Non-Metals", "Carbon Compounds", "Life Processes", "Control & Coordination", "Reproduction", "Heredity", "Light", "Human Eye", "Electricity", "Magnetic Effects", "Environment"],
        "SST": ["Nationalism in Europe", "Nationalism in India", "Making of Global World", "Industrialisation", "Print Culture", "Resources & Development", "Forest & Wildlife", "Water Resources", "Agriculture", "Minerals & Energy", "Manufacturing", "Lifelines of Economy", "Power Sharing", "Federalism", "Gender Religion Caste", "Political Parties", "Democracy Outcomes"],
        "English": ["Letter to God", "Nelson Mandela", "Two Stories about Flying", "Diary of Anne Frank", "Glimpses of India", "Mijbil the Otter", "Madam Rides the Bus", "Sermon at Benares", "The Proposal"],
        "Sanskrit": ["शुचिपर्यावरणम्", "बुद्धिर्बलवती सदा", "व्यायामः सर्वदा पथ्यः","शिशुलालनम्", "जननी तुल्यवत्सला", "सुभाषितानि", "सौहार्दं प्रकृतेः शोभा","विचित्रः साक्षी", "सूक्तयः"],
        "Hindi": ["सूरदास", "तुलसीदास", "देव", "जयशंकर प्रसाद", "सूर्यकांत त्रिपाठी निराला", "नागार्जुन", "गिरिजाकुमार माथुर", "ऋतुराज", "स्वयं प्रकाश", "रामवृक्ष बेनीपुरी", "मन्नू भंडारी"]
    },
    "Class 11": {
        "Physics": ["Units and Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work Energy Power", "System of Particles", "Gravitation", "Mechanical Properties of Solids", "Mechanical Properties of Fluids", "Thermal Properties", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves"],
        "Chemistry": ["Some Basic Concepts", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions", "Hydrogen", "s-Block Elements", "p-Block Elements", "Organic Chemistry Basics", "Hydrocarbons"],
        "Biology": ["The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Cell – Unit of Life", "Biomolecules", "Cell Cycle", "Photosynthesis", "Respiration in Plants", "Breathing", "Excretion"],
        "English": ["The Portrait of a Lady", "We’re Not Afraid to Die", "Discovering Tut", "Landscape of the Soul", "Ailing Planet", "Browning Version", "Silk Road", "Summer of Beautiful White Horse", "The Address", "Ranga’s Marriage", "Einstein at School", "Mother’s Day"],
        "Math": ["Sets", "Relations and Functions", "Trigonometric Functions", "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections", "Introduction to Three Dimensional Geometry", "Limits and Derivatives", "Statistics", "Probability"],
        "Hindi": ["कबीर", "मीरा", "तुलसीदास", "सूरदास", "निराला", "नागार्जुन", "केदारनाथ अग्रवाल", "प्रेमचंद", "कृष्णा सोबती", "धर्मवीर भारती", "फणीश्वरनाथ रेणु", "हरिशंकर परसाई"]
    },
    "Class 12": {
        "Physics": ["Electric Charges and Fields", "Electrostatic Potential", "Current Electricity", "Moving Charges and Magnetism", "Magnetism and Matter", "Electromagnetic Induction", "Alternating Current", "EM Waves", "Ray Optics", "Wave Optics", "Dual Nature", "Atoms", "Nuclei", "Semiconductors"],
        "Chemistry": ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry", "Metallurgy", "p-Block Elements", "d-f Block Elements", "Coordination Compounds", "Haloalkanes", "Alcohols Phenols Ethers", "Aldehydes Ketones Acids", "Amines", "Biomolecules", "Polymers"],
        "Biology": ["Reproduction in Organisms", "Sexual Reproduction in Plants", "Human Reproduction", "Reproductive Health", "Inheritance", "Molecular Basis", "Evolution", "Human Health and Disease", "Food Production", "Microbes", "Biotechnology", "Organisms and Population", "Ecosystem", "Biodiversity"],
        "English": ["The Last Lesson", "Lost Spring", "Deep Water", "The Rattrap", "Indigo", "Poets and Pancakes", "The Interview", "Going Places", "The Third Level", "The Tiger King", "Journey to the End", "The Enemy", "Evans Tries an O-Level"],
        "Math": ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices, Determinants, Continuity and Differentiability", "Applications of Derivatives", "Integrals, Applications of Integrals", "Differential Equations", "Vector Algebra", "Three Dimensional Geometry", "Linear Programming", "Probability"],
        "Hindi": ["जयशंकर प्रसाद", "सूर्यकांत त्रिपाठी निराला", "नागार्जुन", "केदारनाथ अग्रवाल", "सुमित्रानंदन पंत", "महादेवी वर्मा", "मुक्तिबोध", "भवानी प्रसाद मिश्र", "फणीश्वरनाथ रेणु", "हरिशंकर परसाई", "सिल्वर वैडिंग", "जूझ", "अतीत में दबे पाँव"]
    }
}

@app.route('/')
def home():
    return render_template('index.html', syllabus=SYLLABUS_DB)

@app.route('/generate_test', methods=['POST'])
def generate_questions():
    req = request.json
    
    # Validation check
    if not req or 'class' not in req or 'subject' not in req:
        return jsonify({"error": "Invalid Data"}), 400

    try:
        prompt = f"""
        Role: Academic Examiner for {req['class']} (CBSE Board).
        Task: Create 10 MCQs for Subject: '{req['subject']}', Chapter: '{req['chapter']}'.
        
        Requirements:
        1. Questions must be conceptual and based on last 10 years patterns.
        2. Output MUST be a valid JSON Array.
        3. No intro text, no markdown code blocks (```).
        
        Format Example:
        [
            {{ "q": "Question?", "options": ["A", "B", "C", "D"], "ans": "Correct Option", "logic": "Short explanation" }}
        ]
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        
        raw_response = response.text.strip()
        
        if raw_response.startswith("```"):
            raw_response = raw_response.replace("```json", "").replace("```", "").strip()
            
        questions_data = json.loads(raw_response)
        
        # Youtube query helper
        yt_search = f"Class {req['class']} {req['subject']} {req['chapter']} full revision one shot"

        return jsonify({
            "questions": questions_data,
            "query": yt_search
        })

    except Exception as e:
        print(f"ERROR: {e}") 
        return jsonify({"error": "Failed to generate test. AI Server might be busy."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
