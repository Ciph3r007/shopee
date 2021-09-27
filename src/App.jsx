import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductListing from "./components/ProductListing";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/" component={ProductListing} />
        <Redirect from="/home" to="/" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
