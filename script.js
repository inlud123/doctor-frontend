const topSymptoms = [
  "Itching",
  "Skin Rash",
  "Nodal Skin Eruptions",
  "Dischromic Patches",
  "Continuous Sneezing",
  "Shivering",
  "Chills",
  "Watering from Eyes",
  "Stomach Pain",
  "Acidity",
  "Ulcers on Tongue",
  "Vomiting",
  "Cough",
  "Chest Pain",
  "Yellowish Skin",
  "Nausea",
  "Loss of Appetite",
  "Abdominal Pain",
  "Yellowing of Eyes",
  "Burning Micturition",
  "Spotting Urination",
  "Passage of Gases",
  "Internal Itching",
  "Indigestion",
  "Muscle Wasting",
  "Patches in Throat",
  "High Fever",
  "Extra Marital Contacts",
  "Fatigue",
  "Weight Loss",
];

const allSymptoms = [
  "Restlessness",
  "Lethargy",
  "Irregular Sugar Level",
  "Blurred and Distorted Vision",
  "Obesity",
  "Excessive Hunger",
  "Increased Appetite",
  "Polyuria",
  "Sunken Eyes",
  "Dehydration",
  "Diarrhoea",
  "Breathlessness",
  "Family History",
  "Mucoid Sputum",
  "Headache",
  "Dizziness",
  "Loss of Balance",
  "Lack of Concentration",
  "Stiff Neck",
  "Depression",
  "Irritability",
  "Visual Disturbances",
  "Back Pain",
  "Weakness in Limbs",
  "Neck Pain",
  "Weakness of One Body Side",
  "Altered Sensorium",
  "Dark Urine",
  "Sweating",
  "Muscle Pain",
  "Mild Fever",
  "Swelled Lymph Nodes",
  "Malaise",
  "Red Spots over Body",
  "Joint Pain",
  "Pain behind the Eyes",
  "Constipation",
  "Toxic Look (Typhos)",
  "Belly Pain",
  "Yellow Urine",
  "Receiving Blood Transfusion",
  "Receiving Unsterile Injections",
  "Coma",
  "Stomach Bleeding",
  "Acute Liver Failure",
  "Swelling of Stomach",
  "Distention of Abdomen",
  "History of Alcohol Consumption",
  "Fluid Overload",
  "Phlegm",
  "Blood in Sputum",
  "Throat Irritation",
  "Redness of Eyes",
  "Sinus Pressure",
  "Runny Nose",
  "Congestion",
  "Loss of Smell",
  "Fast Heart Rate",
  "Rusty Sputum",
  "Pain during Bowel Movements",
  "Pain in Anal Region",
  "Bloody Stool",
  "Irritation in Anus",
  "Cramps",
  "Bruising",
  "Swollen Legs",
  "Swollen Blood Vessels",
  "Prominent Veins on Calf",
  "Weight Gain",
  "Cold Hands and Feets",
  "Mood Swings",
  "Puffy Face and Eyes",
  "Enlarged Thyroid",
  "Brittle Nails",
  "Swollen Extremeties",
  "Abnormal Menstruation",
  "Muscle Weakness",
  "Anxiety",
  "Slurred Speech",
  "Palpitations",
  "Drying and Tingling Lips",
  "Knee Pain",
  "Hip Joint Pain",
  "Swelling Joints",
  "Painful Walking",
  "Movement Stiffness",
  "Spinning Movements",
  "Unsteadiness",
  "Pus Filled Pimples",
  "Blackheads",
  "Scurring",
  "Bladder Discomfort",
  "Foul Smell of Urine",
  "Continuous Feel of Urine",
  "Skin Peeling",
  "Silver Like Dusting",
  "Small Dents in Nails",
  "Inflammatory Nails",
  "Blister",
  "Red Sore Around Nose",
  "Yellow Crust Ooze",
];

// Load symptoms into UI
window.onload = () => {
  const container = document.getElementById("symptom-container");

  // Create three columns for top symptoms
  const columns = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];
  columns.forEach((col) => {
    col.classList.add("symptom-column");
    container.appendChild(col);
  });

  topSymptoms.forEach((symptom, index) => {
    const formattedSymptom = symptom.toLowerCase().replace(/\s+/g, "_");
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${formattedSymptom}" name="symptoms" onchange="updateSelectedSymptoms()"> ${symptom}`;
    columns[index % 3].appendChild(label);
  });

  const select = document.getElementById("extra-symptoms");
  allSymptoms.forEach((symptom) => {
    const option = document.createElement("option");
    option.value = symptom.toLowerCase().replace(/\s+/g, "_");
    option.textContent = symptom;
    select.appendChild(option);
  });
};

// Add symptom from dropdown
function addSymptom() {
  const select = document.getElementById("extra-symptoms");
  const value = select.value;
  if (value) {
    const formattedText = value.replace(/_/g, " ");
    const selectedContainer = document.getElementById(
      "selected-symptoms-display"
    );

    // Prevent duplicate selections
    if (!document.querySelector(`input[value="${value}"]`)) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${value}" name="symptoms" checked onchange="updateSelectedSymptoms()"> ${formattedText}`;
      selectedContainer.appendChild(label);
    }
    select.value = "";
  }
}

// Update selected symptoms UI
function updateSelectedSymptoms() {
  const selectedSymptoms = Array.from(
    document.querySelectorAll("input[name='symptoms']:checked")
  ).map((cb) => cb.nextSibling.textContent.trim());

  document.getElementById("selected-symptoms-display").innerHTML =
    selectedSymptoms.join(", ");
}

// Filter symptoms in dropdown list
function filterSymptoms() {
  const input = document.getElementById("search-symptoms").value.toLowerCase();
  const dropdown = document.getElementById("dropdown-list");
  dropdown.innerHTML = ""; // Clear previous results

  const filtered = allSymptoms.filter((symptom) =>
    symptom.toLowerCase().includes(input)
  );

  filtered.forEach((symptom) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = symptom;
    item.onclick = () => {
      addSymptomFromDropdown(symptom);
      dropdown.style.display = "none";
    };
    dropdown.appendChild(item);
  });

  dropdown.style.display = filtered.length ? "block" : "none";
}

// Function to handle dropdown selection
function addSymptomFromDropdown(symptom) {
  const formattedSymptom = symptom.toLowerCase().replace(/\s+/g, "_");
  const select = document.getElementById("extra-symptoms");

  // Check if it's already in the list
  if (
    ![...select.options].some((option) => option.value === formattedSymptom)
  ) {
    const option = document.createElement("option");
    option.value = formattedSymptom;
    option.textContent = symptom;
    select.appendChild(option);
  }

  // Add directly to selected symptoms
  addSymptom();
}

function submitSymptoms() {
  const selected = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((cb) => cb.value);

  const payload = { symptoms: selected };

  console.log("Sending to backend:", JSON.stringify(payload));

  fetch("https://doctor-backend-xjwg.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const resultDiv = document.getElementById("recommended-specialist");
      resultDiv.innerHTML = `<h3>Recommended Specialist:</h3><p>${data.specialist}</p>`;
    })
    .catch((error) => console.error("Error:", error));
}
