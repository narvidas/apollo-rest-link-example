import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GET_PERSON } from "./queries";

const Card = styled.div`
  padding: 2rem 3rem;
`;

export const About = () => {
  const { personId } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON, {
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
