import React from 'react';
import styled from 'styled-components';
import { About } from './components/About';
import { Update } from './components/Update';

const Container = styled.div`
  display: flex;
`;

export const PersonView = () => (
  <Container data-testid="person-view">
    <About />
    <Update />
  </Container>
);
