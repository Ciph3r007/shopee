import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
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
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      console.log("Data loaded");
    }
    getData();
  }, []);

  const handleIncrement = (product) => {
    const index = products.indexOf(product);
    products[index].inCart = (products[index].inCart || 0) + 1;
    setProducts([...products]);

    if (cartItems.indexOf(product) === -1) cartItems.push(product);
    setCartItems([...cartItems]);
    console.log(cartItems);
  };

  const handleDecrement = (product) => {
    const index = products.indexOf(product);
    products[index].inCart = products[index].inCart - 1;
    setProducts([...products]);

    if (product.inCart === 0)
      setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const handleRemove = (product) => {
    product.inCart = 0;
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  return (
    <>
      <NavBar cartItems={cartItems} onRemove={handleRemove} />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/not-found" component={NotFound} />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <ProductListing
                products={products}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
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
