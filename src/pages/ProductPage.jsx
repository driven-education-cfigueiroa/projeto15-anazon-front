import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api as axios } from '../services/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Rating } from '../components/Rating';
import { ListGroupItem } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { getError } from '../utils/getError';
import { Store } from '../contexts/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, error: '', loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ product, error, loading }, dispatch] = useReducer(reducer, {
    product: [],
    error: '',
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(error) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const alreadyInCart = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Produto fora de estoque');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                src={product.image}
                alt={product.name}
                className="img-large"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{`${product.name} | Anazon`}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Preço:{' '}
                  {product.price?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </ListGroup.Item>
                <ListGroup.Item>
                  Descrição:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Preço:</Col>
                        <Col>
                          {product.price?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">Em estoque</Badge>
                          ) : (
                            <Badge bg="danger">Não disponível</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Adicionar ao carrinho
                          </Button>
                        </div>
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
