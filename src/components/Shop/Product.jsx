import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Product = ({ product }) => {
  const { id, name, price, src } = product;

  return (
    <div className='board' key={id}>
      <div className='board-title' key='board-title'>
        <span>{name}</span>
      </div>
      <div className='board-avatar-container' key='board-avatar-container'>
        <CustomLink to={`/shop/product/${id}`}>
          <img className='board-avatar' src={src} alt='post' />
          <p>{price} USD</p>
        </CustomLink>
      </div>
    </div>
  );
};

const CustomLink = styled(Link)`
  text-decoration: none;

  color: #800;
  text-decoration: none;

  :hover {
    text-decoration: underline;
    color: #e00;
  }
`;

export default Product;
