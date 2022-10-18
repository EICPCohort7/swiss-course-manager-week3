import { StudentDetails } from './js/StudentDetails.js';

let rootUrl = 'http://localhost:8000/students';

function fetchAllStudents() {
  return fetch(rootUrl).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 404) {
        throw new Error('Could not find students');
      } else {
        throw new Error('Bad response on fetching students');
      }
    }
  });
}

function fetchStudentById(id) {
  return fetch(`${rootUrl}/${id}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 404) {
        throw new Error(`Could not find student with the id ${id}`);
      } else {
        throw new Error(`Bad response on fetching student id ${id}`);
      }
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
    // console.log(student.firstName + ' ' + student.lastName);
    // console.log(`${student.firstName} ${student.lastName}`);
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
      details.renderTo(rightSide);
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
