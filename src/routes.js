import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/index";
import PrivateRoute from "./services/wAuth";

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </HashRouter>
  );
}
export default Rotas;
