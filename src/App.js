import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header>
          <Link to="/">anazon</Link>
        </Header>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
          </Routes>
        </Main>
      </>
    </BrowserRouter>
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
