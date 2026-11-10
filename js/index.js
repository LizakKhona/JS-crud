const BASE_URL = "http://localhost:3000/";

let studentIdToUpdate;
let studentId;
getStudents().then((response) => studentId = response.length);


const getStudentsBtn = document.getElementById("get-students-btn");
const addStudentBtn = document.getElementById("add-student-btn");
const tBody = document.querySelector("tbody")
const addStudentForm = document.getElementById("add-student-form")
const backdrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector(".closeModalBtn");
const addStudentBtnModal = document.getElementById("add-student-btn-modal");


// Функція для отримання всіх студентів

function getStudents() {
  return fetch(`${BASE_URL}students`).then(response => response.json())
}


// Функція для відображення студентів у таблиці

function renderStudents(students) {
  tBody.innerHTML = ""
  
    students.map(student => {
      const tr = document.createElement("tr");
      const studentValues = Object.values(student)
      studentValues.map(value => {
        const td = document.createElement("td");
        td.textContent = value
        tr.appendChild(td)
      })


      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Оновити";
      updateBtn.classList.add("updateBtn")

      updateBtn.addEventListener("click", onUpdateBtn)

      function onUpdateBtn(event) {
        backdrop.classList.toggle("is-hidden")  
        studentIdToUpdate = event.currentTarget.parentNode.querySelector("td").textContent
      }


      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Видалити";
      deleteBtn.classList.add("deleteBtn");

      deleteBtn.addEventListener("click", onDeleteBtn);

      function onDeleteBtn(event) {
        const id = event.currentTarget.parentNode.querySelector("td").textContent;
        deleteStudent(id).then(() => getStudents().then((data) => renderStudents(data)))
      }


      tr.appendChild(updateBtn);
      tr.appendChild(deleteBtn);
      tBody.appendChild(tr)
         
    })  
        
  closeModalBtn.addEventListener("click", () => backdrop.classList.toggle("is-hidden"));

}

// Функція для додавання нового студента

function addStudent(e) {  
  const options = {
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "POST"
  };
  return fetch(`${BASE_URL}students`, options).then(response => response.json())
}


// Функція для оновлення студента

function updateStudent(id, e) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  return fetch(`${BASE_URL}students/${id}`, options).then(response => response.json())
}

// Функція для видалення студента

function deleteStudent(id) {
  const options = {
    method: "DELETE",
  }
  return fetch(`${BASE_URL}students/${id}`, options).then(response => response.json())
}


getStudentsBtn.addEventListener("click", onGetStudentsBtn)

function onGetStudentsBtn() {
  getStudents().then((data) => renderStudents(data));
}


addStudentBtn.addEventListener("click", onAddStudentBtn);

function onAddStudentBtn(event) {
  event.preventDefault();
  studentIdToUpdate += 1
  
  const student = {
      id: studentId =+ 1,
      name: document.querySelector("#name").value,
      age: document.querySelector("#age").value,
      course: document.querySelector("#course").value,
      skills: document.querySelector("#skills").value,
      email: document.querySelector("#email").value,
      isEnrolled: document.querySelector("#isEnrolled").checked,
  };
  
  addStudent(student).then(() => getStudents().then((data) => renderStudents(data)))
}


addStudentBtnModal.addEventListener("click", onAddStudentBtnModal);

function onAddStudentBtnModal(event) {
  event.preventDefault();
  console.log(studentId);
  

  const student = {
    id: String((studentId += 1)),
    name: document.querySelector("#name-modal").value,
    age: document.querySelector("#age-modal").value,
    course: document.querySelector("#course-modal").value,
    skills: document.querySelector("#skills-modal").value,
    email: document.querySelector("#email-modal").value,
    isEnrolled: document.querySelector("#isEnrolled-modal").checked,
  };
  
  updateStudent(studentIdToUpdate, student).then(() =>
    getStudents().then((data) => renderStudents(data)),
  );
  backdrop.classList.toggle("is-hidden")
}