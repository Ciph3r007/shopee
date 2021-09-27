import "./App.css";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductListing from "./components/ProductListing";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import { Context } from "./context/ContextProvider";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [inCart, setInCart] = useState({});
  const [totalItems, setTotalItems] = useState(0);

  const handleIncrement = (product) => {
    if (!inCart[product.id]) {
      setTotalItems(totalItems + 1);
    }

    inCart[product.id] = (inCart[product.id] || 0) + 1;
    setInCart({ ...inCart });

    if (cartItems.indexOf(product) === -1) cartItems.push(product);
    setCartItems([...cartItems]);
  };

  const handleDecrement = (product) => {
    if (inCart[product.id] === 0) console.log("Decrement on 0!");
    inCart[product.id] -= 1;
    setInCart({ ...inCart });

    if (inCart[product.id] === 0) {
      setTotalItems(totalItems - 1);
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
  };

  const handleRemove = (product) => {
    inCart[product.id] = 0;
    setTotalItems(totalItems - 1);
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  return (
    <Context.Consumer>
      {(products) => (
        <>
          <NavBar
            cartItems={cartItems}
            totalItems={totalItems}
            inCart={inCart}
            onRemove={handleRemove}
          />
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
                    inCart={inCart}
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
      )}
    </Context.Consumer>
  );
};

export default App;
