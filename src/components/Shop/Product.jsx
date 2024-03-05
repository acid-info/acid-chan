import { CustomLink } from '../styled/views/Home.styled';

const Product = ({ product }) => {
  const { id, name, price, image } = product;

  return (
    <div className='board' key={id}>
      <div className='board-title' key='board-title'>
        <span>{name}</span>
      </div>
      <div className='board-avatar-container' key='board-avatar-container'>
        <CustomLink to={`/shop/product/${id}`}>
          <img className='board-avatar' src={image?.url} alt='post' />
          <p>{price.raw} USD</p>
        </CustomLink>
      </div>
    </div>
  );
};

export default Product;
