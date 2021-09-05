import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_PERSON, PersonData, UpdatePersonVars, UPDATE_PERSON } from '../PersonView.graphql';
import { Card } from './Card';

const UpdateButton = styled.button`
  margin-left: 0.5rem;
`;

export const Update = () => {
  const { personId } = useParams<{ personId: string }>();
  const [name, setName] = useState('');
  const clearForm = () => setName('');

  const [updatePerson, { loading, error }] = useMutation<PersonData, UpdatePersonVars>(UPDATE_PERSON, {
    update: (cache, { data }) => {
      const oldData = cache.readQuery<PersonData>({ query: GET_PERSON });
      const updatedName = data.person.name;

      cache.writeQuery({
        query: GET_PERSON,
        data: { person: { ...oldData.person, name: updatedName } },
      });
    },
  });

  if (loading) return <Card>Loading...</Card>;
  if (error) return <Card>Error occured</Card>;

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePerson({
            variables: { path: `/person/${personId}`, body: { name } },
          });
          clearForm();
        }}
      >
        <div>Enter new name:</div>
        <input onChange={(e) => setName(e.target.value)} />
        <UpdateButton type="submit">Update</UpdateButton>
      </form>
    </Card>
  );
};
