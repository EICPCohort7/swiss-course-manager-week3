export class StudentDetails {
  #dataFields = {
    email: 'E-mail',
    phoneNumber: 'Phone Number',
    city: 'City',
    province: 'Province',
    country: 'Country',
  };

  constructor(student) {
    this.student = student;
  }

  #buildPrefix(printLabels, field) {
    let prefix = '';
    if (printLabels) {
      if (field === 'province' && this.student.country === 'US') {
        prefix = 'State';
      } else {
        prefix = this.#dataFields[field];
      }
      prefix += ': ';
    }
    return prefix;
  }
  // * @param {string | Element} dest Either an id of an existing element, or an actual Element reference

  /**
   * @typedef {{printLabels: boolean}} RenderToArgs
   * @param {string | Element} dest Element or id of element to render to
   * @param {RenderToArgs} options
   * @returns
   */
  renderTo(dest, options = {}) {
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
    let card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML(
      'afterbegin',
      `<div class="card-header bg-primary text-white">${firstName} ${lastName}</div>`
    );
    let list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush');

    for (let field of Object.keys(this.#dataFields)) {
      let prefix = this.#buildPrefix(options.printLabels, field);
      if (this.student[field]) {
        list.insertAdjacentHTML(
          'beforeend',
          `<li class="list-group-item">${prefix}${this.student[field]}</li>`
        );
      }
    }
    card.insertAdjacentElement('beforeend', list);
    target.replaceChildren(card);
  }
}
