import React from "react";
import { About } from "./About";
import { Update } from "./Update";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export const PersonView = () => (
  <Container>
    <About />
    <Update />
  </Container>
);
