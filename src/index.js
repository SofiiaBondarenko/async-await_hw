import { getStudents } from "./api/getStudents";
import { updateStudents } from "./api/updateStudents";
import { deleteStudents } from "./api/deleteStudents";
import { postStudents } from "./api/postStudents";
import { renderMarkup } from "./markup/renderMarkup";

const getbtnRef = document.querySelector("#get-students-btn");
const tbodyRef = document.querySelector("tbody");
const addStudentRef = document.querySelector("#addStudent-btn");
const backdropRef = document.querySelector(".backdrop");

// const modalFormRef = document.querySelector("#add-student-form");
const modalFormRef = document.querySelector(".modal-form");

let currentId = null;

function renderTable() {
  getStudents().then((res) => (tbodyRef.innerHTML = renderMarkup(res)));
}

getbtnRef.addEventListener("click", () => {
  renderTable();
});

function openModal() {
  backdropRef.style.display = "flex";
  backdropRef.style.pointerEvents = "auto";
}

function closeModal() {
  backdropRef.style.display = "none";
  backdropRef.style.pointerEvents = "none";
  modalFormRef.reset();
  currentId = null;
}

backdropRef.addEventListener("click", (evt) => {
  if (evt.target === backdropRef) closeModal();
});
addStudentRef.addEventListener('click', ()=>{
  openModal()
  modalFormRef.querySelector('.submit').textContent='Create'
})

tbodyRef.addEventListener("click", (evt) => {
  if (evt.target.nodeName !== "BUTTON") {
    return;
  }
  
  const action = evt.target.dataset.action;
  const tr = evt.target.closest('tr');
  
const id = tr.querySelector(".student-id").textContent.trim();

  if (action === 'delete') {
    if (confirm("Ви впевнені, що хочете видалити цього студента?")) {
      deleteStudents(id).then(() => renderTable());
    }
  }

  if (action === 'update') {
    currentId = id;
    openModal();
    modalFormRef.elements.id.value = id;
    modalFormRef.elements.name.value = tr.querySelector(".student-name").textContent;
    modalFormRef.elements.age.value = tr.querySelector(".student-age").textContent;
    modalFormRef.elements.course.value = tr.querySelector(".student-course").textContent;
    modalFormRef.elements.skills.value = tr.querySelector(".student-skills").textContent;
    modalFormRef.elements.email.value = tr.querySelector(".student-email").textContent;
    modalFormRef.elements.isEnrolled.checked = tr.querySelector(".student-status").textContent.trim() === 'зарахований';

    modalFormRef.querySelector(".submit").textContent = "Update";
  }
});

modalFormRef.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const id = Number(modalFormRef.elements.id.value);
  const skillsInput = modalFormRef.elements.skills.value;
  
  const studentData = {
    name: modalFormRef.elements.name.value,
    age: Number(modalFormRef.elements.age.value),
    course: modalFormRef.elements.course.value,
    skills: skillsInput.split(",").map((s) => s.trim()),
    email: modalFormRef.elements.email.value,
    isEnrolled: modalFormRef.elements.isEnrolled.checked,
  };

  if (currentId === null) {
    postStudents(studentData).then(() => {
      closeModal();
      renderTable();
    });
  } else {
    let targetId = isNaN(id) ? id: Number(id);
    updateStudents(studentData, targetId).then(() => {
      closeModal();
      renderTable();
    });
  }
});
