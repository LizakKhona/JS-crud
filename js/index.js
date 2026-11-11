const BASE_URL = "http://localhost:3000/";

let studentIdToUpdate;
let studentId;
async function defaultStudentIdLength() {
  try {
    const array = await getStudents()
    studentId = array.length;
  } catch (error) {
    console.log(error);
  }
}
defaultStudentIdLength()



const getStudentsBtn = document.getElementById("get-students-btn");
const addStudentBtn = document.getElementById("add-student-btn");
const tBody = document.querySelector("tbody")
const addStudentForm = document.getElementById("add-student-form")
const backdrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector(".closeModalBtn");
const addStudentBtnModal = document.getElementById("add-student-btn-modal");


// Функція для отримання всіх студентів

async function getStudents() {
  try {
    const response = await fetch(`${BASE_URL}students`)
    const result = await response.json();
    return result
  } catch (error) {
    console.log(error);
  }
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

      async function onDeleteBtn(event) {
        const id = event.currentTarget.parentNode.querySelector("td").textContent;
        try {
          const toDelete = await deleteStudent(id)
          const data = await getStudents()
          renderStudents(data)
        } catch(error) {
          console.log(error);
        }
      }


      tr.appendChild(updateBtn);
      tr.appendChild(deleteBtn);
      tBody.appendChild(tr)
         
    })  
        
  closeModalBtn.addEventListener("click", () => backdrop.classList.toggle("is-hidden"));

}

// Функція для додавання нового студента

async function addStudent(e) {  
  const options = {
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "POST",
  };

  try {
    const response = await fetch(`${BASE_URL}students`, options)
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error);
  }
}


// Функція для оновлення студента

async function updateStudent(id, e) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}students/${id}`, options)
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error);
  }
}

// Функція для видалення студента

async function deleteStudent(id) {
  const options = {
    method: "DELETE",
  }  

  try {
    const response = await fetch(`${BASE_URL}students/${id}`, options)
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error);
  }
}


getStudentsBtn.addEventListener("click", onGetStudentsBtn)

async function onGetStudentsBtn() {
  try {
    const response = await getStudents()
    renderStudents(response);
  } catch (error) {
    console.log(error);
  }
}


addStudentBtn.addEventListener("click", onAddStudentBtn);

async function onAddStudentBtn(event) {
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

  try {
  const add = await addStudent(student);
  const data = await getStudents();
  renderStudents(data);
  } catch (error) {
    console.log(error);
  }
}


addStudentBtnModal.addEventListener("click", onAddStudentBtnModal);

async function onAddStudentBtnModal(event) {
  event.preventDefault();  

  const student = {
    id: String((studentId += 1)),
    name: document.querySelector("#name-modal").value,
    age: document.querySelector("#age-modal").value,
    course: document.querySelector("#course-modal").value,
    skills: document.querySelector("#skills-modal").value,
    email: document.querySelector("#email-modal").value,
    isEnrolled: document.querySelector("#isEnrolled-modal").checked,
  };
  
  
  try {
    const update = await updateStudent(studentIdToUpdate, student);
    const data = await getStudents()
    renderStudents(data);
  } catch (error) {
    console.log(error);
  }

  backdrop.classList.toggle("is-hidden")
}