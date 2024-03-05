import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, CustomLink } from '../styled/views/Home.styled';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import { useEffect, useState } from 'react';
import { getCart, createCart } from '../../common/shop/cart';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cartState from '../../atoms/shop/cartState';
import cartCountState from '../../atoms/shop/cartCountState';
import CartProduct from '../Shop/CartProduct';

const CheckoutButton = styled.button`
  display: block;
  margin-top: 32px;
  margin-bottom: 32px;
  margin-inline: auto;
  padding: 16px 32px;
  font-size: 24px;

  cursor: pointer;
`;

const CheckoutLink = styled(Link)`
  text-decoration: none;
`;

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState(true);
  const [cartInfo, setCartInfo] = useState(null);
  const setCartCount = useSetRecoilState(cartCountState);

  useEffect(() => {
    const handleCart = async () => {
      let cartId;

      const localCartId = localStorage.getItem('cartId');

      if (cart) {
        cartId = cart?.id;
      } else if (localCartId) {
        cartId = localCartId;
      } else {
        const newCart = await createCart();
        cartId = newCart?.id;
        setCart(newCart);
        localStorage.setItem('cartId', cartId);
      }

      const cartInfo = await getCart(cartId);
      setCartCount(cartInfo?.line_items?.length || 0);

      setLoading(false);
      setCartInfo(cartInfo);
    };

    handleCart();
  }, [cart]);

  return (
    <>
      <Helmet>
        <title>Cart | AcidChan</title>
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
        <h2>Your Cart</h2>
        {loading ? (
          <div>Loading..</div>
        ) : cartInfo?.line_items?.length ? (
          cartInfo.line_items.map((item) => {
            return (
              <div className='board' key={item.id}>
                <CartProduct item={item} cart={cart} cartInfo={cartInfo} setCartInfo={setCartInfo} />
              </div>
            );
          })
        ) : (
          <div>Your cart is empty</div>
        )}
        {cartInfo?.line_items?.length ? (
          <CheckoutLink to={cartInfo?.hosted_checkout_url}>
            <CheckoutButton>Check out</CheckoutButton>
          </CheckoutLink>
        ) : null}
        <br /> <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default Cart;
