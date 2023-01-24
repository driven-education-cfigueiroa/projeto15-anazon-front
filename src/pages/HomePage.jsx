import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api as axios } from '../services/api';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/products');
        console.log(result.data);
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Produtos em destaque</h1>
      <Products>
        {products.map((product) => (
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
        ))}
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
