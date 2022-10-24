/* eslint-disable no-unused-vars */
let countries = {
  CA: 'Canada',
  UK: 'United Kingdom',
  US: 'United States',
};

let usStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

let caProvinces = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NT: 'Northwest Territories',
  NS: 'Nova Scotia',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon Territory',
};

/**
 * @typedef {{[key:string]: string}} StateProvincesCollection
 *
 * @param {StateProvincesCollection} states
 * @returns {HTMLOptionElement[]}
 */
function generateOptionsForLoop(states) {
  /** @type {HTMLOptionElement[]} */
  let options = [];
  for (let abbreviation of Object.keys(states)) {
    let option = document.createElement('option');
    option.value = abbreviation;
    option.textContent = states[abbreviation];
    options.push(option);
  }

  return options;
}

/**
 *
 * @param {StateProvincesCollection} states
 * @returns {HTMLOptionElement[]}
 */
function generateOptionsMap(states) {
  let abbreviations = Object.keys(states);
  return abbreviations.map((abbreviation) => {
    let option = document.createElement('option');
    option.value = abbreviation;
    option.textContent = states[abbreviation];
    return option;
  });
}

/**
 *
 * @param {HTMLSelectElement} parentSelect The parent select list, changing the selection here will change the options in the child list
 * @param {HTMLSelectElement} childSelect The child select list
 */
export function linkLists(parentSelect, childSelect) {
  parentSelect.addEventListener('change', (event) => {
    if (event.target.value === 'CA') {
      childSelect.replaceChildren(...generateOptionsForLoop(caProvinces));
      childSelect.parentElement.hidden = false;
    } else if (event.target.value === 'US') {
      childSelect.replaceChildren(...generateOptionsMap(usStates));
      childSelect.parentElement.hidden = false;
    } else {
      childSelect.parentElement.hidden = true;
      childSelect.replaceChildren();
      childSelect.value = '';
    }
  });
}
