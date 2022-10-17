// import { students } from './data/all-data.js';

let leftSide = document.getElementById('left-side');
let leftSideList = document.createElement('ul');

/** @see {https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} */
leftSideList.classList.add('list-unstyled');

// Direct style assignment
leftSideList.style.cursor = 'pointer';

fetch('http://localhost:8000/students')
.then((response) => response.json())
.then((data) => {
  console.log(data);
  for (let student of data) {
    leftSideList.insertAdjacentHTML(
      'beforeend',
      `<li id="${student.id}">${student.firstName} ${student.lastName}</li>`
    );
  }
});

// Event delegation!
leftSideList.addEventListener("click", async (event) => {
  let studentId = event.target.id;
  await fetch('http://localhost:8000/students/' + studentId)
  .then((response) => response.json())
  .then((student) => {
    console.log('You clicked on:', student);
    
    let rightSide = document.getElementById('right-side');
    let studentDetails = document.createElement('div');
    studentDetails.insertAdjacentHTML(
      'beforeend',
      `<p>${student.firstName} ${student.lastName} lives in ${student.city}, ${student.province}`
    );
    rightSide.replaceChildren(studentDetails);
  });
});

leftSide.append(leftSideList);
