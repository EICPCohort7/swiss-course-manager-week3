# Course Manager project

Over the next few weeks, we will work on building out a course manager. This project will be used by any institution that wants to manage courses, classes, students and so on.

## Week 1 assignments

Do all the work in the `public` folder.  
Fork `course-manager` into `course-manager-[teamname]`. Work on the problem with your teammates.

### Student list

Primary goal: Render a list of students' first and last names to a page.

Check out these demos in javascript-examples for reference:

- dom/iterative-content.html & iterative-content.js

In `index.html` add a link to `students.html`.  
Create `students.html` and `students.js`. Include `students.js` in `students.html`.  
Remember that `students.js` will be a module, so add the correct attribute(s) to the `<script>` tag in `students.html`.

In `students.js`:

- Import students from `data/all-data.js`.
- Iterate over each student
- Print the first name and last name for each student to the browser
  - Consider using an unordered list, although a table would be acceptable as well
  - Add any HTML you need to `students.html`.
- Experiment along the way, if it helps break down the problem:
  - After importing `students`, can you log it to the console?
  - Can you write a loop to go over `students` and log the student to the console?
  - Can you log the first name and last name?
  - Can you dynamically write some HTML (prefer `insertAdjacentHTML`) to `students.html`?

### Student details

Primary goal: Clicking on a student's name should reveal other details about the student

Demos/reference:

- demos/events: Pretty much everything under here
- MDN [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

In `students.html`:

- Import Bootstrap, if you haven't already
- Use Bootstrap (or regular CSS, if you prefer) to split the page in half vertically
- The left half should be the list of students by name from the previous section
- The right half will be reserved for student details

In `students.js`:

- Add event handler(s) for each of the student names. Start by having the event handler log that it's been clicked
- Evolve the event handler so that it fetches the student's details out of the `students` array. Log the details to the console.
- Refine the event handler so that it builds some HTML with the student's details. Render the results to the other half of the `students.html` page.
- Clicking on another student should clear away the previous value and replace it with the current student's information.

## Week 3 Assignments

### Make the student list dynamic

Instead of getting the students from a hard-coded list, let's fetch them from a remote server.

Start the "remote" server by invoking `npm run server:json` from the command line, PowerShell, git bash or whatever you're using.

Two parts where we are dynamically fetching data:

1. When `students.html` loads, we should load the list of all students and render it to the page
2. When someone clicks on one of the students in the list, fetch **just that student** from the server

Remote server url: http://localhost:8000/students for all students, http://localhost:8000/students/{id} for an individual student (e.g., http://localhost:8000/students/5 for the student with ID 5).

Fork the `course-manager` repo into `course-manager-[team name]-week3`. Create a branch **from** the week-3-starter branch. Call the branch anything you want, but do work on that branch.

You can use regular, browser-standard `fetch`, or you can include the Axios library if you'd like. There's a good example of how to include Axios in a page [here](https://github.com/EICPCohort7/javascript-examples/blob/main/demos/async/fetch-vs-axios.html).

Also feel free to use either Promises or `async/await` as you see fit.

- Relate the student country and the student provinces to each other
  Both country and state/province should be drop-downs:

```html
<select>
  <option value="1">Value 1</option>
  <option value="2">Value 2</option>
  <option value="3">Value 3</option>
</select>
```

#### Part 1

When a user picks a country, the state/province field should update to...
US => US states
Canada => Canadian provinces
UK => state/province disappears

#### Part 2

And we should have tests for these cases!

### For next week

- Be able to add a student

```

```
