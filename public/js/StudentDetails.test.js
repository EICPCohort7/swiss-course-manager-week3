import { StudentDetails } from './StudentDetails.js';
import { getByText, queryByText } from '@testing-library/dom';
// adds special assertions like toBeInDocument
import '@testing-library/jest-dom';

describe('StudentDetails', () => {
  let canadaStudent = {
    firstName: 'Dylan',
    lastName: 'McDonagh',
    dateOfBirth: '1996-08-11',
    email: 'Dylan_McDonagh@libero.it',
    phoneNumber: '(635) 335-9541',
    city: 'East Kootenays',
    province: 'British Columbia',
    country: 'CA',
    postalCode: 'V0B 0B5',
    departmentId: 1,
    id: 34,
  };

  let ukStudent = {
    firstName: 'Ieva ',
    lastName: 'Mathew',
    dateOfBirth: '1996-07-04',
    email: 'Ieva _Mathew@rogers.ca',
    phoneNumber: '07624 257626',
    city: 'London',
    province: null,
    country: 'UK',
    postalCode: 'SE10 0QS',
    departmentId: 1,
    id: 44,
  };

  let usStudent = {
    firstName: 'Adam',
    lastName: 'Kotlinski',
    dateOfBirth: '1995-03-27',
    email: 'Adam_Kotlinski@rogers.ca',
    phoneNumber: '(313) 600-8863',
    city: 'Oregon',
    province: 'OH',
    country: 'US',
    postalCode: '43618',
    departmentId: 1,
    id: 18,
  };

  let container;

  beforeEach(() => {
    // Ensure that container has been created and is part of the document
    container = document.createElement('div');
    document.body.insertAdjacentElement('beforeend', container);
  });

  test('Smoke test', () => {
    // As long as we can instantiate the StudentDetails object, we're happy
    let details = new StudentDetails(canadaStudent);
    expect(details).not.toBeNull();
  });

  // Stock unit testing, no testing-library
  describe('Unit tests', () => {
    test('should not render province property', () => {
      let details = new StudentDetails(ukStudent);
      details.renderTo(container);

      // Let see if it either prints null (bad) or skips the province (good)
      let listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(4); // Would be 5 if "province" printed
    });

    test('should render province as "State" for a US student', () => {
      let details = new StudentDetails(usStudent);
      details.renderTo(container);

      let listItem = container.querySelector('li:nth-child(4)');
      expect(listItem.textContent).toBe(usStudent.province);
    });
  });

  // Uses testing-library to test from the perspective of the UI
  describe('UI tests', () => {
    test('Simple render', () => {
      let details = new StudentDetails(canadaStudent);
      details.renderTo(container);
      let header = getByText(container, `${canadaStudent.firstName} ${canadaStudent.lastName}`);

      expect(header).toBeInTheDocument();
    });

    test('should not render province property', () => {
      let details = new StudentDetails(ukStudent);
      details.renderTo(container, { printLabels: true });
      let results = queryByText(container, 'Province', { exact: false });
      expect(results).toBeNull();
    });

    test('should render province property', () => {
      let details = new StudentDetails(canadaStudent);
      details.renderTo(container, { printLabels: true });
      let results = queryByText(container, 'Province', { exact: false });
      expect(results).not.toBeNull();
      expect(results).toBeInTheDocument();
    });

    // Maybe map this to some sort of requirements docs
    // test('Requirement Student-0156', () => {
    test('should render province property as "State"', () => {
      let details = new StudentDetails(usStudent);
      details.renderTo(container, { printLabels: true });
      let results = queryByText(container, 'State', { exact: false });
      expect(results).not.toBeNull();
      expect(results).toBeInTheDocument();
      expect(results.textContent).toMatch(usStudent.province);
    });
  });
});
