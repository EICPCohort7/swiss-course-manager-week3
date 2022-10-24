import { fireEvent, getByTestId, getByDisplayValue } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { linkLists } from './link-lists.js';

describe('link-lists.js', () => {
  /** @type {HTMLSelectElement} */
  let countriesSelect;

  /** @type {HTMLSelectElement} */
  let provincesSelect;

  beforeEach(() => {
    // Set up the HTML of the test container
    countriesSelect = document.createElement('select');
    countriesSelect.dataset.testid = 'countries';
    countriesSelect.insertAdjacentHTML(
      'beforeend',
      '<option value="CA">Canada</option><option value="UK">United Kingdom</option><option value="US">United States</option>'
    );
    provincesSelect = document.createElement('select');
    provincesSelect.dataset.testid = 'provinces';
    let provincesContainer = document.createElement('div');
    provincesContainer.append(provincesSelect);
    provincesContainer.hidden = true;
    document.body.append(countriesSelect, provincesContainer);
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  test('Smoke test', () => {
    linkLists(countriesSelect, provincesSelect);
  });

  test('should not render a state or provinces list at page load', () => {
    linkLists(countriesSelect, provincesSelect);
    expect(provincesSelect).not.toBeVisible();
  });

  test('should render Canadian provinces', () => {
    expect(provincesSelect).not.toBeVisible();

    linkLists(countriesSelect, provincesSelect);
    let el = getByTestId(document, 'countries');
    fireEvent.change(el, { target: { value: 'CA' } });
    expect(provincesSelect).toBeVisible();

    let firstOption = getByDisplayValue(document, 'Alberta');
    expect(firstOption).not.toBeNull();
    expect(firstOption).toBeInTheDocument();
  });

  test('should render US states', () => {
    expect(provincesSelect).not.toBeVisible();

    linkLists(countriesSelect, provincesSelect);
    let el = getByTestId(document, 'countries');
    fireEvent.change(el, { target: { value: 'US' } });
    expect(provincesSelect).toBeVisible();

    let firstOption = getByDisplayValue(document, 'Alabama');
    expect(firstOption).not.toBeNull();
    expect(firstOption).toBeInTheDocument();
  });

  test('should hide provinces after clicking on "UK"', () => {
    expect(provincesSelect).not.toBeVisible();

    linkLists(countriesSelect, provincesSelect);
    let el = getByTestId(document, 'countries', { exact: false });
    fireEvent.change(el, { target: { value: 'US' } });
    expect(provincesSelect).toBeVisible();

    fireEvent.change(el, { target: { value: 'UK' } });
    expect(provincesSelect).not.toBeVisible();
  });
});
