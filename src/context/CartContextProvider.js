import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const CartContext = React.createContext();

export function useCartContext() {
  return React.useContext(CartContext);
}

const CartContextProvider = ({ children }) => {
  const [storedItem, setItem] = useLocalStorage("carts");

  /* add items to cart */

  function addToCart(product) {
    setItem([
      ...storedItem,
      { ...product, tprice: product.currentprice, sqty: 1, save: false },
    ]);
  }
  /* remove item from cart */
  function removeFromCart(id) {
    setItem(storedItem.filter((item) => item.id !== id));
  }
  function countCartItems() {
    return storedItem.length;
  }
  function handleQty(value, id) {
    setItem(
      storedItem.map((item) => {
        if (item.id === id) {
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
        if (item.id === id) {
          return { ...item, save: !item.save };
        } else {
          return { ...item };
        }
      })
    );
  }

  /* calculate total price */

  function calculateTotalPrice() {
    let totalPrice = storedItem.reduce((prevItem, newItem) => {
      if (newItem.save === false) {
        return prevItem + newItem.price * newItem.sqty;
      } else {
        return 0;
      }
    }, 0);
    return totalPrice;
  }

  /* calculate the Discount */

  function calculateDiscount() {
    let discount = storedItem.reduce((prevItem, newItem) => {
      if (newItem.save === false) {
        return prevItem + (newItem.price * newItem.sqty - newItem.tprice);
      } else {
        return 0;
      }
    }, 0);
    return discount;
  }
  /* calculate total amount by minimizig the prize */
  function totalAmount() {
    if (calculateTotalPrice() > 500) {
      return calculateTotalPrice() - calculateDiscount() + 50;
    } else {
      return calculateTotalPrice() - calculateDiscount();
    }
  }

  function checkItExist(id) {
    let exist = storedItem.find((item) => item.id === id);
    if (exist) {
      return true;
    } else {
      return false;
    }
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
        calculateDiscount,
        calculateTotalPrice,
        totalAmount,
        checkItExist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
