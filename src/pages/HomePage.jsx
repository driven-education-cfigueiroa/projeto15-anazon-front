import { useEffect, useReducer } from 'react';
import { api as axios } from '../services/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from '../components/Product';
import { Helmet } from 'react-helmet-async';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { getError } from '../utils/getError';

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
  const [{ products, error, loading }, dispatch] = useReducer(reducer, {
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
        dispatch({ type: 'FETCH_ERROR', payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Anazon | Tudo pra você, de A a Z.</title>
      </Helmet>
      <h1>Produtos em destaque</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product._id}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};
