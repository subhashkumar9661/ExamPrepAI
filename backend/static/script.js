// Maps Topic Names to YouTube Video IDs
// Add more mappings here as needed
const REVISION_VIDEOS = {
    // Class 10 Science
    "Chemical Reactions": "Tqb10-gK6Oc", 
    "Acids Bases Salts": "FSyD_cM6qgA",
    "Metals Non-Metals": "ie20VjY4KQI",
    "Life Processes": "G88l-F1XnEc",
    "Light": "9T00F61s-hk",
    
    // Class 10 Math
    "Real Numbers": "mU-M3uYgqRk",
    "Trigonometry": "hYp0p2jY_m0",
    
    // Class 12 Physics
    "Electrostatics": "U5n3q5XjEwA",
    "Optics": "n5Xl0H6M8tI",
    
    // Class 12 Chemistry
    "Solutions": "2G1M2A9g5I0"
};

// Curriculum Data Structure
const SYLLABUS = {
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
};

/* =========================================
   Global State
   ========================================= */
const chatWindow = document.getElementById('chat-box');
const actionPanel = document.getElementById('options-area'); // make sure HTML has this ID

let appState = { 
    class: "", 
    subject: "", 
    chapter: "", 
    count: 5 
};

let quizData = [];
let user responses = [];
let isFetching = false; // Lock to prevent double clicks



// Initial Load
init();

function init() {
    // Start by showing class options
    showButtons(Object.keys(SYLLABUS), 'class');
}

/**
 * Renders a set of buttons in the action panel
 * @param {Array} items - List of strings to display
 * @param {String} type - The current step (class/subject/chapter)
 */
function showButtons(items, type) {
    actionPanel.innerHTML = '';
    
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.innerText = item;
        btn.onclick = () => handleInput(item, type);
        actionPanel.appendChild(btn);
    });
}

/**
 * Handles user selection flow
 */
function handleInput(selection, type) {
    appendChat(selection, 'user');

    if (type === 'class') {
        appState.class = selection;
        appendChat(`Great! Which Subject for ${selection}?`, 'bot');
        showButtons(Object.keys(SYLLABUS[selection]), 'subject');
    
    } else if (type === 'subject') {
        appState.subject = selection;
        appendChat(`Okay, choose a Chapter to analyze:`, 'bot');
        showButtons(SYLLABUS[appState.class][selection], 'chapter');
    
    } else if (type === 'chapter') {
        appState.chapter = selection;
        appendChat(`Chapter selected: ${selection}. How many questions should I generate?`, 'bot');
        renderCountInput();
    }
}

function renderCountInput() {
    actionPanel.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center; justify-content:center; width:100%;">
            <input type="number" id="q-count" min="3" max="15" value="5" 
                   style="padding:10px; width:60px; border-radius:5px; border:1px solid #ccc;">
            <button id="startBtn" onclick="generateTest()" 
                    style="background:#1a237e; color:white;">
                Predict & Generate
            </button>
        </div>
    `;
}

function appendChat(text, sender) {
    const div = document.createElement('div');
    div.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
    div.innerHTML = text;
    
    // Insert before the controls area so controls stay at bottom
    // Or just append if using flex-col layout
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* =========================================
   API & Quiz Logic
   ========================================= */

async function generateTest() {
    if (isFetching) return;
    isFetching = true;

    // Disable button to prevent spam
    const btn = document.getElementById("startBtn");
    if (btn) {
        btn.innerText = "Generating...";
        btn.disabled = true;
    }

    const countVal = document.getElementById('q-count').value;
    appState.count = parseInt(countVal) || 5;

    actionPanel.innerHTML = ''; // clear input
    appendChat(`Analyzing last 10 years of papers... generating ${appState.count} most probable questions...`, 'bot');

    try {
        const response = await fetch('/generate_test', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(appState)
        });

        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();

        if (data.questions && data.questions.length > 0) {
            quizData = data.questions;
            userAnswers = new Array(quizData.length).fill(null);
            
            // Start the quiz
            renderQuestion(0);
        } else {
            appendChat("⚠️ No questions received. Try a different chapter.", 'bot');
            isFetching = false;
            init(); // reset
        }

    } catch (error) {
        console.error(error);
        appendChat("⚠️ Network error. Please try again later.", 'bot');
        isFetching = false;
        
        // Add retry button
        actionPanel.innerHTML = `<button onclick="location.reload()">Reload App</button>`;
    }
}

function renderQuestion(index) {
    // Check if quiz is finished
    if (index >= quizData.length) {
        showResults();
        return;
    }

    const q = quizData[index];
    
    // HTML for the question card
    const cardHTML = `
        <div class="question-card">
            <div class="prediction-badge">🔮 ${q.prediction_logic || "High Probability"}</div>
            <p style="margin:10px 0;"><strong>Q${index+1}:</strong> ${q.q}</p>
            
            <div class="options-grid" style="border:none; padding:0; justify-content:flex-start;">
                ${q.options.map(opt => 
                    `<button style="margin:5px;" onclick="saveAnswer(${index}, '${opt}')">${opt}</button>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Instead of replacing optionsArea, we append to chat so history remains
    // But for a quiz, usually we want the active question in the control area
    // Let's stick to your layout: Put question in Options Area
    actionPanel.innerHTML = cardHTML;
}

function saveAnswer(index, answer) {
    userAnswers[index] = answer;
    // Move to next question
    renderQuestion(index + 1);
}

/* =========================================
   Result & Analysis
   ========================================= */

function showResults() {
    let score = 0;
    let weakTopics = [];

    quizData.forEach((q, i) => {
        if (userAnswers[i] === q.ans) { // Ensure backend sends 'ans' or 'correct'
            score++;
        } else {
            weakTopics.push(q.logic || "General Concept");
        }
    });

    const percentage = Math.round((score / quizData.length) * 100);
    const uniqueWeakness = [...new Set(weakTopics)];
    
    // Check if we have a video for this chapter
    const videoId = REVISION_VIDEOS[appState.chapter];
    let videoHTML = "";
    
    if (videoId) {
        videoHTML = `
            <div class="video-container">
                <div class="video-card">
                    <div class="video-title">📺 Recommended: ${appState.chapter} Revision</div>
                    <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                </div>
            </div>
        `;
    }

    const resultHTML = `
        <div class="result-card">
            <h2>📊 Prediction Report</h2>
            <h1 style="font-size:2.5rem; margin:10px 0; color:#1a237e;">${percentage}%</h1>
            <p>You scored <strong>${score}/${quizData.length}</strong></p>
            <hr style="border:0; border-top:1px solid #ccc; margin:15px 0;">
            
            <p style="text-align:left;"><strong>Focus Areas:</strong></p>
            <p class="weak-area" style="text-align:left;">
              ${uniqueWeakness.length > 0 ? uniqueWeakness.join(', ') : "None! You are exam ready! 🎉"}
            </p>
            
            ${videoHTML}
            
            <button onclick="location.reload()" 
                    style="margin-top:20px; background:#4CAF50; color:white; border:none; width:100%;">
                Start New Test
            </button>
        </div>
    `;

    actionPanel.innerHTML = ""; // Clear question
    appendChat(resultHTML, 'bot');
    
    // Reset lock
    isFetching = false;
}