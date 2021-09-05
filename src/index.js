import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { RestLink } from "apollo-link-rest";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { PersonView } from "./PersonView";

const restLink = new RestLink({
  uri: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json", // Required for mutations to work with REST link
  },
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Router>
        <Route exact path="/:personId">
          <PersonView />
        </Route>
        <Route exact path="/">
          <Redirect to="/1" />
        </Route>
      </Router>
    </div>
  </ApolloProvider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
