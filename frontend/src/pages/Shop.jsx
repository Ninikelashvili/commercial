import React, { useCallback, useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Shop = React.memo(() => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [filtredItems, setFiltredItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleFilter = useCallback((e) => {
    setFilterItem(e.target.value);
  }, []);

  useEffect(() => {
    const filtredItem = data?.filter((allItem) =>
      allItem.name?.toLowerCase().includes(filterItem?.toLowerCase())
    );
    setFiltredItems(filtredItem);
  }, [filterItem, data]);

  return (
    <ShopPage
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error {error.data}</p>
      ) : (
        <>
          <form>
            <input type="text" placeholder="Search" onChange={handleFilter} />
            <FiSearch />
          </form>
          <ProductList>
            {filtredItems?.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`/shop/${product.id}`}>
                    <img src={product.image} alt={product.image} />
                    <span>
                      <h3>{product.name}</h3>
                      <p>{product.price}$</p>
                    </span>
                  </Link>
                  <button onClick={() => handleAddToCart(product)}>
                    <IoAddSharp />
                    <BsCart />
                  </button>
                </div>
              );
            })}
          </ProductList>
        </>
      )}
    </ShopPage>
  );
});
const ShopPage = styled(motion.div)`
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    @media (max-width: 960px) {
      width: 640px;
      margin: 0 auto;
    }
    @media (max-width: 700px) {
      width: 441px;
      margin: 0 auto;
    }
    @media (max-width: 500px) {
      max-width: 400px;
      width: 100%;
    }
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: solid 0.2px #000;
      padding-bottom: 10px;
      ::placeholder {
        font-family: system-ui;
        letter-spacing: 2px;
        font-weight: 100;
        color: #000;
      }
    }
  }
`;
const ProductList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    justify-content: center;
  }
  div {
    @media (max-width: 960px) {
      margin: 10px 20px;
    }
    @media (max-width: 700px) {
      max-width: 200px;
    }
    @media (max-width: 500px) {
      max-width: 400px;
    }
    max-width: 300px;
    width: 100%;
    margin: 30px 0;
    position: relative;
    cursor: pointer;
    :hover {
      button {
        opacity: 1;
      }
    }
    button {
      border: none;
      outline: none;
      position: absolute;
      top: 5%;
      right: 10%;
      background: #fff;
      border-radius: 50%;
      padding: 15px 10px;
      opacity: 0;
      transition: all 0.5s ease;
      cursor: pointer;
      @media (max-width: 1080px) {
        opacity: 1;
      }
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
    }
    p {
      font-family: system-ui;
      font-weight: 100;
      font-size: 15px;
      color: #000;
    }
    h3 {
      font-family: system-ui;
      font-weight: 200;
      font-size: 15px;
      color: #000;
    }
    img {
      width: 100%;
      object-fit: contain;
    }
  }
`;
export default Shop;
