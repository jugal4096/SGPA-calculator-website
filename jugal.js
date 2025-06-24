const schemeSubjects = {
  cbc3: [
    {name: "Engineering Mathematics III", credits: 3},
    {name: "Discrete Mathematical Structures", credits: 3},
    {name: "Data Structures", credits: 3},
    {name: "Computer Networks", credits: 3},
    {name: "Object Oriented Programming", credits: 3},
    {name: "Digital Electronics and Microprocessors", credits: 3},
    {name: "Lab- Data Structures", credits: 1},
    {name: "Lab- Computer Networks", credits: 1},
    {name: "Lab- Object Oriented Programming", credits: 1},
    {name: "Lab- Digital Electronics and Microprocessors", credits: 1}
  ],
  cbc4: [
    {name: "Engineering Mathematics IV", credits: 4},
    {name: "Design and Analysis of Algorithms", credits: 3},
    {name: "Database Management Systems", credits: 3},
    {name: "Operating System", credits: 3},
    {name: "Internet of Things", credits: 3},
    {name: "Open Elective-I", credits: 3},
    {name: "Environmental Science", credits: 0},
    {name: "Lab- Design and Analysis of Algorithms", credits: 1},
    {name: "Lab- Database Management Systems", credits: 1},
    {name: "Lab- Operating System", credits: 1},
    {name: "Lab- Internet of Things", credits: 1},
    {name: "Universal human values 2",credits: 3}
  ],
  nep3: [
    {name: "Discrete Mathematical Structures", credits: 3},
    {name: "Data Structures", credits: 3},
    {name: "Object Oriented Programming", credits: 3},
    {name: "Computer Networks", credits: 3},
    {name: "Lab- Data Structures", credits: 1},
    {name: "Lab- Object Oriented Programming", credits: 1},
    {name: "Lab- Computer Networks", credits: 1},
    {name: "Data Structures and Algorithm (MDM)", credits: 3},
    {name: "Lab- Data Structures and Algorithm (MDM)", credits: 1},
    {name: "Data Structures and Algorithm (OE)", credits: 3},
    {name: "Universal Human Values II", credits: 2},
    {name: "Professional Ethics and Cyber Laws", credits: 2},
    {name: "Community based Project", credits: 2}
  ],
  nep4: [
    {name: "Statistics, Random Variables and Linear Algebra", credits: 3},
    {name: "Database Management System", credits: 3},
    {name: "Operating Systems", credits: 3},
    {name: "Lab- Database Management System", credits: 1},
    {name: "Lab- Operating Systems", credits: 1},
    {name: "Introduction to Database Management Systems (MDM)", credits: 3},
    {name: "Introduction to Database Management Systems (OE)", credits: 3},
    {name: "Lab- Computer Programming I (Python Programming)", credits: 1},
    {name: "Lab- Computer Programming II (FSD-I)", credits: 1},
    {name: "Technical Communication (AEC02)", credits: 2},
    {name: "Business Intelligence (HSSM)", credits: 2},
    {name: "Environmental Science (VEC)", credits: 2}
  ],
  cbc5: [
    {name: "Theory of Computation", credits: 4},
    {name: "Artificial Intelligence", credits: 3},
    {name: "Machine Learning", credits: 3},
    {name: "Software Engineering", credits: 3},
    {name: "Professional Ethics and Cyber Laws", credits: 3},
    {name: "Data Structures and Algorithms (OEC)", credits: 3},
    {name: "Lab- Machine Learning", credits: 1},
    {name: "Lab- Software Engineering", credits: 1},
    {name: "Computer Programming Lab I", credits: 2},
    {name: "Mini Project I", credits: 2}
  ],
  cbc6: [
    {name: "Professional Elective I", credits: 3},
    {name: "Professional Elective II", credits: 3},
    {name: "Professional Elective III", credits: 3},
    {name: "Business Intelligence", credits: 3},
    {name: "Introduction to Artificial Intelligence", credits: 3},
    {name: "Computer Programming Lab II", credits: 1},
    {name: "Lab- Professional Elective I", credits: 1},
    {name: "Lab- Professional Elective II", credits: 1},
    {name: "Mini Project II", credits: 2}
  ]
  
  
  
};

const gradePoints = {"A++":10,"A+":9,"A":8,"B+":7,"B":6,"C+":5,"C":4,"D":0};

function createRow(sub) {
  const table = document.getElementById("subjects");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${sub.name}</td>
    <td>${sub.credits}</td>
    <td><select>
      <option value="10">A++ (10)</option>
      <option value="9">A+ (9)</option>
      <option value="8">A (8)</option>
      <option value="7">B+ (7)</option>
      <option value="6">B (6)</option>
      <option value="5">C+ (5)</option>
      <option value="4">C (4)</option>
      <option value="0">D (0)</option>
    </select></td>`;
  table.appendChild(tr);
}

function loadSubjects(scheme, semester) {
  const table = document.getElementById("subjects");
  table.innerHTML = '<tr><th>Subject Name</th><th>Credits</th><th>Grade</th></tr>';
  const key = scheme + semester;
  schemeSubjects[key]?.forEach(createRow);
}

function addAdditionalSubject() {
  const table = document.getElementById("subjects");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input placeholder="Subject Name"></td>
    <td><input type="number" placeholder="Credits"></td>
    <td><select>
      <option value="10">A++ (10)</option>
      <option value="9">A+ (9)</option>
      <option value="8">A (8)</option>
      <option value="7">B+ (7)</option>
      <option value="6">B (6)</option>
      <option value="5">C+ (5)</option>
      <option value="4">C (4)</option>
      <option value="0">D (0)</option>
    </select></td>`;
  table.appendChild(tr);
}

function calculateSGPA() {
  const rows = document.querySelectorAll('#subjects tr');
  let totalCredits = 0, totalPoints = 0;

  for (let i = 1; i < rows.length; i++) {
    const inputs = rows[i].querySelectorAll('td');
    let credits = parseFloat(inputs[1]?.querySelector('input')?.value || inputs[1]?.textContent);
    if (isNaN(credits)) {
      credits = parseFloat(inputs[1]?.textContent);
    }
    const gradePoint = parseFloat(rows[i]?.querySelector('select')?.value || 0);
    totalCredits += credits;
    totalPoints += credits * gradePoint;
  }

  const sgpa = totalPoints / totalCredits;
  document.getElementById('results').textContent = `SGPA: ${sgpa.toFixed(2)}`;
}

// Event Listeners
const schemeSelect = document.getElementById("scheme");
const semesterSelect = document.getElementById("semester");

schemeSelect.addEventListener("change", loadAllSubjects);
semesterSelect.addEventListener("change", loadAllSubjects);
function loadAllSubjects() {
  loadSubjects(schemeSelect.value, semesterSelect.value);
  calculateSGPA();
}

document.getElementById("add-subject").addEventListener("click", addAdditionalSubject);
document.getElementById("subjects").addEventListener("change", calculateSGPA);

// INITIAL LOAD
loadAllSubjects();
