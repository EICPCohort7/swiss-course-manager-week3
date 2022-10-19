/* globals axios */
import { StudentDetails } from './js/StudentDetails.js';

let rootUrl = 'http://localhost:8000/students';

function fetchAllStudents() {
  return axios
    .get(rootUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('Could not find students');
        } else {
          throw new Error('Bad response on fetching students');
        }
      } else {
        throw error; // re-throw the error
      }
    });
}

function fetchStudentById(id) {
  return axios
    .get(`${rootUrl}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error(`Could not find student with the id ${id}`);
        } else {
          throw new Error(`Bad response on fetching student id ${id}`);
        }
      } else {
        throw error;
      }
    });
}

function renderStudents(students) {
  let leftSide = document.getElementById('left-side');
  let rightSide = document.getElementById('right-side');
  let leftSideList = document.createElement('ul');

  /** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} */
  leftSideList.classList.add('list-unstyled');

  // Direct style assignment
  leftSideList.style.cursor = 'pointer';

  for (let student of students) {
    leftSideList.insertAdjacentHTML(
      'beforeend',
      `<li data-student-id="${student.id}">${student.firstName} ${student.lastName}</li>`
    );
  }
  // Event delegation!
  leftSideList.addEventListener('click', async (event) => {
    try {
      let studentId = event.target.dataset.studentId;
      let student = await fetchStudentById(Number(studentId));

      let details = new StudentDetails(student);
      details.renderTo(rightSide, { printLabels: true });
    } catch (error) {
      console.error('Error trying to fetch student details:', error);
    }
  });

  leftSide.append(leftSideList);
}

async function main() {
  try {
    let students = await fetchAllStudents();
    renderStudents(students);
  } catch (error) {
    console.error('Error fetching and rendering students:', error.message);
  }
}

main();
