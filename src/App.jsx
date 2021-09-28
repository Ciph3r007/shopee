import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import ProductListing from "./components/productListing/ProductListing";
import Product from "./components/product/Product.jsx";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import NotFound from "./components/notFound/NotFound";
import Checkout from "./components/checkout/Checkout";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/" component={ProductListing} />
        <Redirect from="/home" to="/" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
