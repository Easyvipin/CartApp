import React from "react";
import { useCartContext } from "../context/CartContextProvider";

const Cart = () => {
  const {
    storedItem,
    countCartItems,
    removeFromCart,
    handleQty,
    saveLater,
    calculateDiscount,
    calculateTotalPrice,
    totalAmount,
  } = useCartContext();

  return (
    <div className="cart-container p-2">
      {storedItem.length === 0 ? (
        <div className="message p-2">No Items Available in Cart</div>
      ) : (
        <div className="cart-items">
          <ul className="cart-list">
            <h3 className="p-2">Cart Items({countCartItems()})</h3>
            {storedItem.map((product) => {
              return (
                <li className="each-item m-1">
                  <div className="product-det">
                    <img src={product.image} className="product-img" alt="" />
                  </div>
                  <div className="product-actions">
                    <h4 className="brand bold light-text">{product.brand}</h4>
                    <h5 className="brand bold light-text">
                      {product.description}
                    </h5>
                    <select
                      name="qty"
                      onChange={(e) => handleQty(e.target.value, product.id)}
                      id=""
                    >
                      {[...Array(product.qty).keys()].map((x) => {
                        if (x + 1 === product.sqty) {
                          return (
                            <option key={x + 1} value={x + 1} selected>
                              {x + 1}
                            </option>
                          );
                        } else {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <button
                      className="btn btn-yellow p-1 m-1 white-text"
                      onClick={() => {
                        removeFromCart(product.id);
                      }}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                    <button
                      className="btn btn-yellow p-1 white-text"
                      onClick={() => saveLater(product.id)}
                    >
                      {product.save === true ? (
                        <>
                          {" "}
                          <i className="fa fa-heart"></i> Saved{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <i className="far fa-heart"></i> Unsaved
                        </>
                      )}
                    </button>
                    <h3>₹ {product.tprice}</h3>
                  </div>
                  <div className="price"></div>
                </li>
              );
            })}
          </ul>
          <div className="subtotal">
            <h2 className="bold light">PRICE DETAILS</h2>
            <div className="total-price">
              <h3 className="bold">Price</h3>
              <h3> ₹ {calculateTotalPrice()}</h3>
            </div>
            <div className="discount">
              <h3 className="green">Discount</h3>
              <h3 className="light">- ₹ {calculateDiscount()}</h3>
            </div>
            <div className="delivery">
              <h3>Delivery charges </h3>
              <h3>+ ₹50</h3>
            </div>
            <div className="grand-total">
              <h3>Total Amount:</h3>
              <h3>₹{totalAmount()}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
