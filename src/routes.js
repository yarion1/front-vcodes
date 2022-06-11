import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/index";
import PrivateRoute from "./services/wAuth";

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
export default Rotas;
