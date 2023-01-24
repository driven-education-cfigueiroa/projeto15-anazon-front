import { data } from './data';
import styled from 'styled-components';

export const App = () => {
  return (
    <>
      <Header>
        <a href="/">anazon</a>
      </Header>
      <Main>
        <h1>Produtos em destaque</h1>
        <Products>
          {data.products.map((product) => (
            <Product key={product._id}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <ProductInfo>
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>R$ {product.price.toString().replace('.', ',')}</p>
                <button>Adicionar ao carrinho</button>
              </ProductInfo>
            </Product>
          ))}
        </Products>
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 1rem;
`;

const Header = styled.header`
  background-color: #404040;
  padding: 1rem;
  a {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
  }
`;

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
