import React, { useRef } from "react";
import { useCartContext } from "../context/CartContextProvider";
import ProductData from "../Products.json";
const Cart = () => {
  const { storedItem, removeFromCart, handleQty, saveLater } = useCartContext();

  return (
    <div className="cart-container p-2">
      {storedItem.length == 0 ? (
        <div className="message p-2">No Items Available in Cart</div>
      ) : (
        <div className="cart-items">
          <ul className="cart-list">
            {storedItem.map((product) => {
              return (
                <li className="each-item m-1">
                  <div className="product-det">
                    <img src={product.image} className="product-img" alt="" />
                    <h4 className="brand bold light-text">{product.brand}</h4>
                  </div>
                  <div className="product-actions">
                    <select
                      name="qty"
                      onChange={(e) => handleQty(e.target.value, product.id)}
                      id=""
                    >
                      {[...Array(product.qty).keys()].map((x) => {
                        if (x + 1 == product.sqty) {
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
                      <i class="fa fa-trash"></i> Delete
                    </button>
                    <button
                      className="btn btn-yellow p-1 white-text"
                      onClick={() => saveLater(product.id)}
                    >
                      {product.save === true ? (
                        <>
                          {" "}
                          <i class="fa fa-heart"></i> Saved{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <i class="far fa-heart"></i> Unsaved
                        </>
                      )}
                    </button>
                  </div>
                  <div className="price">
                    <h3>{product.tprice}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="subtotal">
            <span className="total">
              TOTAL PRICE : ₹
              {storedItem.reduce((prevItem, newItem) => {
                if (newItem.save === false) {
                  return prevItem + newItem.tprice;
                } else {
                  return 0;
                }
              }, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
