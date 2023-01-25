import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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
                  Preço: R$ {product.price?.toString().replace('.', ',')}
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
                          R$ {product.price?.toString().replace('.', ',')}
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
                          <Button variant="primary">
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
