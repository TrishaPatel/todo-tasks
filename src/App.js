import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import ShowTask from "./components/TodoTask/ShowTask.jsx";
import styled from "styled-components";

const Header = styled.div`
  padding: 15px 0px;
  color: white;
  font-size: 24px;
  background: #931078;
  width: 100%;
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
