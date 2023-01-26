import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export const SignupPage = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Registro na Anazon</title>
      </Helmet>
      <h1 className="my-3">Criar conta</h1>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Registrar</Button>
        </div>
        <div className="mb-3">
          Você já tem uma conta?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Fazer login</Link>
        </div>
      </Form>
    </Container>
  );
};
