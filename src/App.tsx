import OneNote from "components/OneNote";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AllNotes from "./components/AllNotes";

const App: React.FC = () => (
  <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/notes" component={AllNotes} />
      <Route exact path="/notes/:id" component={OneNote} />
      <Redirect from="/" to="/notes" />
    </Switch>
  </BrowserRouter>
);

export default App;
