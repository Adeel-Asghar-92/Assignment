import React from "react";
import { Route, Switch } from "react-router-dom";
import AddBank from "./Pages/Bank/AddBank";
import Banks from "./Pages/Bank/Banks";
import Home from "./Pages/Home";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "30px",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Route>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addBank" exact component={AddBank} />
          <Route path="/banks" exact component={Banks} />
          <Route>Page not Found</Route>
        </Switch>
      </Route>
    </div>
  );
}

export default App;
