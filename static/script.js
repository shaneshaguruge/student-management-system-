const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchStudent = document.getElementById("searchStudent");

// Add Student
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const age = document.getElementById("studentAge").value;

    if (name === "" || age === "" || Number(age) <= 0) {
        alert("Please enter valid student details!");
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="name">${name}</td>
        <td class="age">${age}</td>
        <td>
            <button type="button" class="edit-btn">Edit</button>
            <button type="button" class="delete-btn">Delete</button>
        </td>
    `;

    // Edit Student
    row.querySelector(".edit-btn").addEventListener("click", function() {
        const currentName = row.querySelector(".name").textContent;
        const currentAge = row.querySelector(".age").textContent;

        const newName = prompt("Enter new student name:", currentName);

        if (newName === null || newName.trim() === "") {
            return;
        }

        const newAge = prompt("Enter new student age:", currentAge);

        if (newAge === null || newAge.trim() === "" ||
            !Number.isInteger(Number(newAge)) || Number(newAge) <= 0) {
            alert("Please enter a valid age!");
            return;
        }

        row.querySelector(".name").textContent = newName.trim();
        row.querySelector(".age").textContent = newAge;
    });

    // Delete Student
    row.querySelector(".delete-btn").addEventListener("click", function() {
        row.remove();
    });

    studentList.appendChild(row);

    studentForm.reset();
});

// Search Student
searchStudent.addEventListener("input", function() {
    const searchValue = searchStudent.value.toLowerCase();

    const rows = studentList.querySelectorAll("tr");

    rows.forEach(function(row) {
        const studentName = row.querySelector(".name").textContent.toLowerCase();

        if (studentName.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});