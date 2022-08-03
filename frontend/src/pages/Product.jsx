import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../features/cartSlice";
import { IoAddSharp } from "react-icons/io5";
import { BsCart } from "react-icons/bs";

const Product = React.memo(() => {
  let params = useParams();
  const dispatch = useDispatch();
  let id = params.id;
  const products = useSelector((state) => state.products.items);
  const product = products
    .filter((product) => parseInt(product.id) === parseInt(id))
    .map((item) => item);

  const handleIncreaseCount = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <ProductPage>
      {product?.map((product, i) => {
        return (
          <section key={i}>
            <div>
              <img src={product.image} alt={product.image} />
            </div>
            <div>
              <h4>{product.name}</h4>
              <p>
                <strong> Category: </strong>
                {product.category}
              </p>
              <p>{product.description}</p>
              <span>Price {product.price}$</span>
              <button onClick={() => handleIncreaseCount(product)}>
                <IoAddSharp />
                <BsCart />
              </button>
            </div>
          </section>
        );
      })}
    </ProductPage>
  );
});
const ProductPage = styled.div`
  max-width: 1366px;
  width: 100%;
  padding: 50px 10px;
  margin: 0 auto;
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 550px) {
      flex-direction: column;
    }
    div {
      @media (max-width: 550px) {
        width: 100%;
        align-items: center;
      }
      width: 50%;
      display: flex;
      justify-content: center;
      :last-child {
        flex-direction: column;
        align-items: flex-start;
        @media (max-width: 550px) {
          padding: 0 20px;
        }
      }
      h4 {
        font-family: system-ui;
        font-weight: 200;
        font-size: 40px;
        color: #000;
        margin-bottom: 20px;
        @media (max-width: 550px) {
          margin-top: 10px;
        }
      }
      p {
        font-family: system-ui;
        font-weight: 200;
        font-size: 15px;
        margin-bottom: 10px;
        max-width: 85%;
        width: 100%;
        text-align: start;
        @media (max-width: 550px) {
          max-width: initial;
        }
        strong {
          font-weight: 400;
        }
      }
      img {
        height: 600px;
        @media (max-width: 870px) {
          height: 400px;
        }
        @media (max-width: 650px) {
          height: 320px;
        }
        @media (max-width: 550px) {
          height: 500px;
        }
      }
      span {
        font-family: system-ui;
        font-weight: 400;
        font-size: 15px;
        margin-top: 30px;
        @media (max-width: 650px) {
          margin-top: 15px;
        }
      }
      button {
        padding: 15px 40px;
        margin-top: 15px;
        background: #000;
        color: #fff;
        border: none;
        outline: none;
        transition: all 0.5s ease;
        :hover {
          color: #000;
          background-color: #fff;
          cursor: pointer;
        }
      }
    }
  }
`;

export default Product;
