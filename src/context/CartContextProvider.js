import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const CartContext = React.createContext();

export function useCartContext() {
  return React.useContext(CartContext);
}

const CartContextProvider = ({ children }) => {
  const [storedItem, setItem] = useLocalStorage("carts");

  function addToCart(product) {
    setItem([
      ...storedItem,
      { ...product, tprice: product.currentprice, sqty: 1, save: false },
    ]);
  }
  function removeFromCart(id) {
    setItem(storedItem.filter((item) => item.id !== id));
  }
  function countCartItems() {
    return storedItem.length;
  }
  function handleQty(value, id) {
    setItem(
      storedItem.map((item) => {
        if (item.id == id) {
          item.sqty = value;
          item.tprice = value * item.currentprice;
        }
        return item;
      })
    );
  }

  function saveLater(id) {
    setItem(
      storedItem.map((item) => {
        if (item.id == id) {
          return { ...item, save: !item.save };
        } else {
          return { ...item };
        }
      })
    );
  }
  return (
    <CartContext.Provider
      value={{
        storedItem,
        addToCart,
        removeFromCart,
        countCartItems,
        handleQty,
        saveLater,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
