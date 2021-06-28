import React from "react";
import ProductData from "../Products.json";
import { useCartContext } from "../context/CartContextProvider";

const Products = () => {
  const { addToCart, checkItExist } = useCartContext();
  return (
    <div className="product-container">
      <ul className="product-list">
        {ProductData.products.map((product) => {
          return (
            <li className="product-card p-1 m-1" key={product.id}>
              <div className="card-image">
                {/* image */}
                <img src={product.image} alt="" />
              </div>
              <div className="card-body product-det">
                {/* product details */}
                <h4 className="brand light">{product.brand}</h4>
                <p className="desc semi">{product.description}</p>
                {/* product pricing */}
                <span className="current-price bold m-1">
                  {" "}
                  ₹{product.currentprice}
                </span>
                <span className="original-price m-1 light">
                  <strike>₹{product.price}</strike>
                </span>
                <span className="discount m-1 bold green">
                  {product.discount}
                </span>
              </div>
              <div className="card-footer product-actions">
                {checkItExist(product.id) === true ? (
                  <h5>
                    Added <i class="fa fa-cart-plus"></i>
                  </h5>
                ) : (
                  <button
                    className="btn btn-yellow p-1 bold white-text"
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    {" "}
                    ADD <i class="fa fa-cart-plus"></i>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
