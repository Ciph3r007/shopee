import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
import CartSideBar from "./components/CartSidebar";
import NavBar from "./components/NavBar";
import ProductListing from "./components/ProductListing";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      category: "Demo",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
    },
    // More products...
  ]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      console.log("Data loaded");
    }
    getData();
  }, []);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/not-found" component={NotFound} />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <CartSideBar />
              <ProductListing products={products} />
            </>
          )}
        />
        <Redirect from="/home" to="/" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default App;
