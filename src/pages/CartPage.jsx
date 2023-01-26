import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Col, Row, Button, ListGroup, Card } from 'react-bootstrap';
import { Store } from '../contexts/Store';
import { MessageBox } from '../components/MessageBox';

export const CartPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const getTotal = (cartItems) => {
    const total = cartItems.reduce(
      (total, item) => {
        total.quantity += item.quantity;
        total.price += item.price * item.quantity;
        return total;
      },
      { quantity: 0, price: 0 }
    );
    return total;
  };

  const total = getTotal(cartItems);

  return (
    <div>
      <Helmet>
        <title>Carrinho de compras da Anazon</title>
      </Helmet>
      <h1>Carrinho de compras</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Seu carrinho de compras está vazio.{' '}
              <Link to="/">Continue suas compras</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>
                      {item.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {total.quantity > 0 && <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal ({total.quantity}{' '}
                    {total.quantity > 1 ? 'itens' : 'item'}):{' '}
                    {total.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Fechar Pedido
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>}
      </Row>
    </div>
  );
};
