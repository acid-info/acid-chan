import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, BoardsBox, BoardsContent, CustomLink } from '../styled/views/Home.styled';
import { TEMP_PRODUCTS_DATA } from './Shop';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import { useEffect, useState } from 'react';
import { createCart, addItemToCart } from '../../common/shop/cart';

const Image = styled.img`
  max-width: unset !important;
  max-height: unset !important;
  width: 100%;
`;

const ProductItem = () => {
  const { id: productId } = useParams();
  const { name, price, src, description } = TEMP_PRODUCTS_DATA.find((product) => String(product.id) === String(productId));
  const [cartId, setCartId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getCartId = async () => {
      const cart = await createCart();
      setCartId(cart?.id);
    };
    getCartId();
  }, []);

  const handlePurchase = async () => {
    await addItemToCart(cartId, {
      id: 'prod_8XO3wp77QNlYAz',
      quantity: quantity,
    });

    alert('Item added to cart');
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>{name} | AcidChan</title>
      </Helmet>
      <SidebarMenu />
      <Container>
        <AboutContent>
          <Header>
            <Logo>
              <Link to='/'>
                <img alt='plebchan' src='assets/logo/logo-transparent.png' />
              </Link>
            </Logo>
          </Header>
          <CustomLink to='/shop'>Back to shop</CustomLink>
        </AboutContent>
        <br />
        <Categories />
        <BoardsBox>
          <div className='board' key={productId}>
            <div className='boxbar'>
              <h2>{name}</h2>
            </div>
            <BoardsContent>
              <Image src={src} alt='post' />
              <p>{price} USD</p>
              <p>{description}</p>

              <br />
              <div>
                <p>Quantity:</p>
                <input type='number' placeholder='Quantity' defaultValue={1} style={{ width: '50px' }} onChange={handleQuantityChange} />
              </div>
              <br />
              <br />
              <div>
                <button onClick={handlePurchase}>Buy</button>
              </div>
              <br />
              <br />
            </BoardsContent>
          </div>
        </BoardsBox>
        <FooterSection />
      </Container>
    </>
  );
};

export default ProductItem;
