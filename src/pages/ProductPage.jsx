import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  return (
    <>
      <h1>{slug}</h1>
    </>
  );
};
