import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import { api as axios } from '../services/api';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, error: '', loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const HomePage = () => {
  const [{ products, error, loading }, dispatch] = useReducer(logger(reducer), {
    products: [],
    error: '',
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Produtos em destaque</h1>
      <Products>
        {loading ? (
          <h2>Carregando...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product key={product._id}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <ProductInfo>
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>R$ {product.price.toString().replace('.', ',')}</p>
                <button>Adicionar ao carrinho</button>
              </ProductInfo>
            </Product>
          ))
        )}
      </Products>
    </>
  );
};

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Product = styled.div`
  border: 1px solid #404040;
  margin: 1rem;
  img {
    width: 100%;
    max-width: 350px;
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
  p:nth-child(2) {
    font-weight: 700;
  }
`;
