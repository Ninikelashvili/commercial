import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import next from "../media/next.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = React.memo(() => {
  const products = useSelector((state) => state.products.items);
  const topProduct = products
    ?.filter((product, i) => i < 2)
    .map((product) => product);

  return (
    <HomeContainer
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <h1>
          <span>New</span>
          <span>Summer 2022</span>
          <span>collection</span>
        </h1>
        <div>
          {topProduct?.map((product) => {
            return <img key={product.id} src={product.image} alt="" />;
          })}
        </div>
        <button>
          <Link to="/shop">
            <img src={next} alt={next} />
          </Link>
        </button>
      </section>
      <section></section>
    </HomeContainer>
  );
});
const HomeContainer = styled(motion.div)`
  max-width: 1366px;
  margin: 0 auto;
  width: 100%;
  section {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    @media (max-width: 1000px) {
      flex-direction: column;
    }

    button {
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      :hover {
        transform: translateX(10px);
      }
      @media (max-width: 1000px) {
        position: absolute;
        right: 10%;
      }
      @media (max-width: 580px) {
        position: static;
        margin-top: 10px;
      }
    }
    h1 {
      text-transform: uppercase;
      font-family: system-ui;
      font-weight: 100;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 60px;
      @media (max-width: 1250px) {
        font-size: 50px;
      }
      @media (max-width: 790px) {
        font-size: 40px;
      }
      @media (max-width: 650px) {
        font-size: 30px;
      }
      @media (max-width: 1000px) {
        flex-direction: row;
        margin-bottom: 20px;
      }
      @media (max-width: 580px) {
        flex-direction: column;
        align-items: flex-start;
      }
      @media (max-width: 580px) {
        margin-left: 30px;
      }
      @media (max-width: 860px) {
        font-size: 40px;
      }
      @media (max-width: 720px) {
        flex-direction: column;
      }
      span {
        margin: 10px 0;
        letter-spacing: 5px;
        @media (max-width: 580px) {
          letter-spacing: 2px;
          font-size: 45px;
          :first-child {
            margin-left: 50px;
          }
          :nth-child(2) {
            margin-left: 5px;
          }
          :nth-child(3) {
            margin-left: 60px;
          }
        }
        @media (max-width: 720px) {
          margin: 5px 0;
        }
        :nth-child(2) {
          color: #ff0090;
          font-weight: 200;
        }
      }
    }
    div {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      img {
        margin-right: 50px;
        max-height: 600px;
        height: 100%;
        @media (max-width: 1340px) {
          max-height: 500px;
        }
        @media (max-width: 1160px) {
          max-height: 400px;
        }
        @media (max-width: 650px) {
          max-height: 300px;
        }
        @media (max-width: 580px) {
          :nth-child(2) {
            display: none;
          }
          max-height: 500px;
          margin-right: 0;
        }
        :nth-child(2) {
          max-height: 400px;
          height: 100%;
          @media (max-width: 1160px) {
            max-height: 200px;
          }
        }
      }
    }
  }
`;
export default Home;
