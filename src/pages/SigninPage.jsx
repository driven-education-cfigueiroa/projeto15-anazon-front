import { Link, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export const SigninPage = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Fazer Login</title>
      </Helmet>
      <h1 className="my-3">Acessar Anazon</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Continuar</Button>
        </div>
        <div className="mb-3">
          Novo na Anazon?{' '}
          <Link to={`/signup?redirect=${redirect}`}>
            Criar sua conta da Anazon
          </Link>
        </div>
      </Form>
    </Container>
  );
};
