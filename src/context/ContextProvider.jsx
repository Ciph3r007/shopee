import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [inCart, setInCart] = useState({});
  const [totalItems, setTotalItems] = useState(0);

  const handleIncrement = (product) => {
    if (!inCart[product.id]) {
      setTotalItems(totalItems + 1);
      cartItems.push(product);
      setCartItems([...cartItems]);
    }

    inCart[product.id] = (inCart[product.id] || 0) + 1;
    setInCart({ ...inCart });

    // Why doesn't it work???
    // if (cartItems.indexOf(product) === -1) cartItems.push(product);
    // setCartItems([...cartItems]);
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

  const handleEmpty = () => {
    setInCart({});
    setCartItems([]);
    setTotalItems(0);
  };

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      localStorage.setItem("products", JSON.stringify(data));
    }
    if (!localStorage.products) getData();
  }, []);

  const products = JSON.parse(localStorage.getItem("products"));

  return (
    <Context.Provider
      value={{
        products,
        cartItems,
        inCart,
        totalItems,
        onIncrement: handleIncrement,
        onDecrement: handleDecrement,
        onRemove: handleRemove,
        onEmpty: handleEmpty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
