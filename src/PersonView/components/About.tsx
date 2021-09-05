import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GetPersonVars, GET_PERSON, PersonData } from '../PersonView.graphql';
import { Card } from './Card';

export const About = () => {
  const { personId } = useParams<{ personId: string }>();
  const { loading, error, data } = useQuery<PersonData, GetPersonVars>(GET_PERSON, {
    variables: { path: `/person/${personId}` },
  });

  if (loading) return <Card>Loading...</Card>;
  if (error) return <Card>Error occured</Card>;
  return (
    <Card>
      <div>Name: {data.person.name}</div>
      <div>Age: {data.person.age}</div>
      <div>Occupation: {data.person.occupation.title}</div>
    </Card>
  );
};
