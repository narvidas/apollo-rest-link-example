import { gql } from "apollo-boost";

export const GET_PERSON = gql`
  query GetPerson($path: String!) {
    person @rest(type: "Person", path: $path) {
      occupationId @export(as: "occupation")
      name
      age
      occupation
      @rest(
        path: "/occupation/{exportVariables.occupation}"
        type: "[Occupation]"
      ) {
        title
      }
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($path: String!, $body: String!) {
    person(path: $path, body: $body)
    @rest(method: "PATCH", type: "Person", path: $path, bodyKey: "body") {
      name
    }
  }
`;
