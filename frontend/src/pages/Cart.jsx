import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
  totalAmount,
} from "../features/cartSlice";
import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import back from "../media/prev.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = React.memo(() => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalAmount());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCount = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCount = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <CartPage
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        Your Cart <span>({cart.cartItems.length})</span>
      </h3>
      {cart.cartItems.length === 0 ? (
        <div></div>
      ) : (
        <>
          <CartProductsList>
            {cart?.cartItems?.map((cartItem) => {
              return (
                <OneCartProduct key={cartItem.id}>
                  <ProductContent>
                    <ProductDescription>
                      <img src={cartItem.image} alt={cartItem.image} />
                      <span>
                        <Description>
                          <h4>{cartItem.name} </h4>
                          <p>
                            Category: <strong>{cartItem.category} </strong>
                          </p>
                        </Description>
                        <Count>
                          <button onClick={() => handleDecreaseCount(cartItem)}>
                            <AiOutlineMinus />
                          </button>
                          <span> {cartItem.cartQuantity}</span>
                          <button onClick={() => handleIncreaseCount(cartItem)}>
                            <IoAddSharp />
                          </button>
                        </Count>
                        <span>{cartItem.price * cartItem.cartQuantity} $</span>
                      </span>
                    </ProductDescription>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      remove
                    </button>
                  </ProductContent>
                </OneCartProduct>
              );
            })}
          </CartProductsList>
        </>
      )}
      <ToTalSection>
        <section>
          <button onClick={() => handleClearCart()}>Clear</button>
          <div>
            <h4>SubTotal</h4>
            <span>{cart.cartTotalAmount} $</span>
          </div>
        </section>
        <button>Proceed to checkout</button>
      </ToTalSection>

      <BackToShop to="/shop">
        <button>
          <img src={back} alt={back} />
          <p>Keep Shoping</p>
        </button>
      </BackToShop>
    </CartPage>
  );
});

const BackToShop = styled(Link)`
  display: flex;
  width: 100%;
  padding: 40px 0;
  justify-content: center;
  button {
    border: none;
    outline: none;
    background: transparent;
    margin-right: 10px;
    height: 35px;
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
    transition: all 0.5s ease-in-out;
    :hover {
      transform: translateX(-10px);
      cursor: pointer;
    }
  }
  p {
    font-family: system-ui;
    font-weight: 100;
    font-size: 15px;
    color: #000;
  }
`;
const CartPage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  h3 {
    font-family: system-ui;
    font-weight: 100;
    font-size: 60px;
    color: #ff0090;
    margin: 30px 0;
    display: flex;
    align-items: flex-end;
    span {
      color: #000;
      font-size: 20px;
    }
  }
`;
const CartProductsList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const OneCartProduct = styled.div`
  height: 200px;
  margin: 0 30px;
  max-width: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-top: solid 0.5px #000;
  max-width: 45%;
  width: 100%;
  @media (max-width: 1220px) {
    max-width: 100%;
  }
  @media (max-width: 650px) {
    margin: 0 10px;
  }
  img {
    margin-right: 20px;
    height: 100%;
  }
`;
const ProductContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  span {
    font-family: system-ui;
    font-weight: 300;
    font-size: 15px;
  }
  button {
    height: 30px;
    border: none;
    outline: none;
    text-decoration: underline;
    background: none;
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-family: system-ui;
    font-weight: 100;
    transition: all 0.5s ease;
    :hover {
      color: red;
      cursor: pointer;
    }
  }
`;
const ProductDescription = styled.div`
  display: flex;
  span {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    span {
      height: 30px;
    }
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h4 {
    font-family: system-ui;
    font-weight: 100;
    font-size: 22px;
  }
  p {
    font-family: system-ui;
    font-size: 15px;
    font-weight: 200;
    margin-top: 10px;
  }
`;
const Count = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  span {
    margin: 0 20px;
    font-size: 13px;
  }
  button {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    position: initial;
  }
`;

const ToTalSection = styled.section`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    max-width: 50%;
    width: 100%;
    padding: 25px;
    background-color: #000;
    color: #fff;
    font-family: system-ui;
    font-weight: 200;
    font-size: 20px;
    letter-spacing: 2px;
    border: none;
    outline: none;
    cursor: pointer;
    @media (max-width: 550px) {
      font-size: 15px;
    }
    @media (max-width: 474px) {
      padding: 16px 25px;
    }
  }
  section {
    border-top: solid 0.5px #000;
    border-bottom: solid 0.5px #000;
    max-width: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 9px 20px;
    @media (max-width: 550px) {
      padding: 6px 20px;
    }
    div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-family: system-ui;
        font-weight: 100;
        font-size: 15px;
      }
      span {
        font-family: system-ui;
        font-weight: 300;
        font-size: 15px;
      }
    }
    button {
      border: solid 0.2px #000;
      background: transparent;
      outline: none;
      color: #000;
      letter-spacing: 0;
      width: initial;
      padding: 5px 15px;
      margin: 5px 0;
      font-size: 13px;
    }
  }
`;
export default Cart;
