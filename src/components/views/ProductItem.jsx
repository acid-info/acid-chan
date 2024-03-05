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
import CartButton from '../CartButton';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cartCountState from '../../atoms/shop/cartCountState';
import cartState from '../../atoms/shop/cartState';

const Image = styled.img`
  max-width: unset !important;
  max-height: unset !important;
  width: 100%;
`;

const ProductItem = () => {
  const { id: productId } = useParams();
  const { name, price, src, description } = TEMP_PRODUCTS_DATA.find((product) => String(product.id) === String(productId));
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);
  const setRecoilState = useSetRecoilState(cartCountState);

  useEffect(() => {
    const handleCart = async () => {
      const cart = await createCart();
      setCart(cart);
      localStorage.setItem('cartId', cart.id);
    };
    handleCart();
  }, []);

  const handlePurchase = async () => {
    await addItemToCart(cart?.id, {
      id: 'prod_8XO3wp77QNlYAz',
      quantity: quantity,
    });

    setRecoilState(Number(quantity));

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
      <CartButton />
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
