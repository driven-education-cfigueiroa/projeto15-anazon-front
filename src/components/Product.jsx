import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { useContext } from 'react';
import { Store } from '../contexts/Store';
import { api as axios } from '../services/api';

export const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const alreadyInCart = cartItems.find((item) => item._id === product._id);
    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Produto fora de estoque');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          {product.price?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            Fora de estoque
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            Adicionar ao carrinho
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
