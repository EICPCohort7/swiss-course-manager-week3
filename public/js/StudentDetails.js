export class StudentDetails {
  constructor(student) {
    this.student = student;
  }

  /**
   *
   * @param {string | Element} dest Either an id of an existing element, or an actual Element reference
   * @returns null on 'dest' not found
   */
  renderTo(dest) {
    let target = null;
    if (typeof dest === 'string') {
      target = document.getElementById(dest);
      if (target === null) {
        console.warn(
          `StudentDetails: could not find element to render to, passed ${dest}. Exiting.`
        );
        return null;
      }
    } else {
      // Assumes this was passed an element
      target = dest;
    }

    let { firstName, lastName } = this.student;
    let dataFields = ['email', 'phoneNumber', 'city', 'province', 'country'];
    let card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML(
      'afterbegin',
      `<div class="card-header bg-primary text-white">${firstName} ${lastName}</div>`
    );
    let list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush');
    for (let field of dataFields) {
      if (this.student[field]) {
        list.insertAdjacentHTML(
          'beforeend',
          `<li class="list-group-item">${this.student[field]}</li>`
        );
      }
    }
    card.insertAdjacentElement('beforeend', list);
    target.replaceChildren(card);
  }
}
