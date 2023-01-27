import React from 'react';
import { Col, Row } from 'react-bootstrap';

export const CheckoutSteps = (props) => {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Login</Col>
      <Col className={props.step2 ? 'active' : ''}>Envio</Col>
      <Col className={props.step3 ? 'active' : ''}>Pagamento</Col>
      <Col className={props.step4 ? 'active' : ''}>Finalizar pedido</Col>
    </Row>
  );
};
