import { CustomLink } from '../styled/views/Home.styled';

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

export default Product;
