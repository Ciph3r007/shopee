import { createContext, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      localStorage.setItem("products", JSON.stringify(data));
    }
    if (!localStorage.products) getData();
  }, []);

  const products = JSON.parse(localStorage.getItem("products"));

  return <Context.Provider value={products}>{props.children}</Context.Provider>;
};

export default ContextProvider;
