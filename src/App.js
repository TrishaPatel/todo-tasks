import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import ShowTask from "./components/todoTask/showTask.jsx";

import styled from "styled-components";
const primary = blue[900]; // #F44336
const Header = styled.div`
  padding: 15px;
  text-lign: center;
  color: blue;
`;
function App() {
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Header>To-Do Tasks</Header>
      </Grid>
      <Grid container justify="center">
        <ShowTask />
      </Grid>
    </div>
  );
}

export default App;
