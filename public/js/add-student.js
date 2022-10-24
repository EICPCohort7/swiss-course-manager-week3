import { linkLists } from './link-lists.js';

let countriesSelect = document.getElementById('country');
let provincesSelect = document.getElementById('province');
linkLists(countriesSelect, provincesSelect);

let data = document.getElementById('form');
data.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(data)

    for (let entry of formData) {
        console.log(`The ${entry[0]} field has the value ${entry[1]}.`);
    }
});