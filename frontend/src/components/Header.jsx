import React from "react";
import styled from "styled-components";
import logo from "../media/logo.png";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = React.memo(() => {
  const cart = useSelector((state) => state.cart);
  return (
    <HeaderContainer>
      <nav>
        <Link to="/">
          <img src={logo} alt={logo} />
        </Link>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <Link to="/cart">
            <li>Cart</li>
          </Link>
        </ul>
        <Link to="/cart">
          <span>
            <BsFillCartFill /> {cart.cartItems.length}
          </span>
        </Link>
      </nav>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.header`
  width: 100%;
  nav {
    max-width: 1366px;
    margin: 0 auto;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    ul {
      display: flex;
      align-items: center;
      li {
        margin: 0 20px;
        font-family: system-ui;
        font-weight: 200;
        color: #000;
        cursor: pointer;
      }
    }
    img {
      height: 50px;
    }
    svg {
      color: #000;
    }
  }
`;
export default Header;
