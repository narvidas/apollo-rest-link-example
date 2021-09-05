import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { PersonView } from './PersonView';
import { GET_PERSON } from './PersonView.graphql';

const getMockPerson = () => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  age: faker.datatype.number(100),
  occupation: faker.name.jobTitle,
});

const mockPerson = getMockPerson();

const mock = {
  request: {
    query: GET_PERSON,
  },
  result: {
    data: {
      person: mockPerson,
    },
  },
};

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

afterEach(() => {
  cleanup();
});

const renderView = () =>
  render(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Router history={history}>
        <PersonView />
      </Router>
    </MockedProvider>,
  );

describe('Person View', () => {
  test('should display loading state ', () => {
    const { getByText } = renderView();
    getByText(/Loading/i);
  });

  test('should show user info', async () => {
    const { findByTestId, getByText } = renderView();

    await findByTestId('person-view');

    getByText(mockPerson.name.toString(), { exact: false });
    getByText(mockPerson.occupation.toString(), { exact: false });
  });
});
