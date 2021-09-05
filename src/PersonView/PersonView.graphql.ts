import { gql } from 'apollo-boost';
import { GetVars, UpdateVars } from '../utils/graphql';

export interface GetPersonVars extends GetVars {}
export type UpdatePersonVars = UpdateVars<Partial<Person>>;
export type PersonData = { person: Person };
export interface Person {
  id: number;
  name: string;
  age: number;
  occupation: Occupation;
}

export interface OccupationVars extends GetVars {}
export type OccupationData = { occupation: Occupation };
interface Occupation {
  title: string;
}

export const GET_PERSON = gql`
  query getPerson($path: String!) {
    person @rest(type: "Person", path: $path) {
      occupationId @export(as: "occupation")
      name
      age
      occupation @rest(path: "/occupation/{exportVariables.occupation}", type: "[Occupation]") {
        title
      }
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation updatePerson($path: String!, $body: String!) {
    person(path: $path, body: $body) @rest(method: "PATCH", type: "Person", path: $path, bodyKey: "body") {
      name
    }
  }
`;
