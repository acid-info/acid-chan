import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, BoardsBox, CustomLink } from '../styled/views/Home.styled';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import { useEffect, useState } from 'react';
import { getCart, createCart, removeItemFromCart } from '../../common/shop/cart';
import { useRecoilState } from 'recoil';
import cartState from '../../atoms/shop/cartState';

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: 32px;

  p {
    font-size: 16px;
  }
`;

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

const RemoveButton = styled.button`
  margin-left: auto;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
`;

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState(true);
  const [cartInfo, setCartInfo] = useState(null);

  useEffect(() => {
    const handleCart = async () => {
      let cartId;

      const localCartId = localStorage.getItem('cartId');

      if (cart) {
        cartId = cart.id;
      } else if (localCartId) {
        cartId = localCartId;
      } else {
        const newCart = await createCart();
        cartId = newCart.id;
        setCart(newCart);
        localStorage.setItem('cartId', cartId);
      }

      const cartInfo = await getCart(cartId);

      setLoading(false);
      setCartInfo(cartInfo);
    };

    handleCart();
  }, [cart]);

  const handleRemove = async (e, line_item_id) => {
    e.preventDefault();
    await removeItemFromCart(cartInfo?.id, line_item_id);

    const newCartInfo = await getCart(cart.id);
    setCartInfo(newCartInfo);

    alert('Item removed from cart');
  };

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
                <BoardsBox>
                  <ItemRow>
                    <div>
                      <h3>{item.name}</h3>
                      <div>
                        <img src={item.image.url} alt={item.name} width={100} height={100} />
                      </div>
                    </div>
                    <PriceRow>
                      <div>
                        <p>Price</p>
                        <p>{item.price.formatted_with_symbol}</p>
                      </div>
                      <div>
                        <p>Quantity</p>
                        <p>{item.quantity}</p>
                      </div>
                      <div>
                        <p>Total</p>
                        <p>{item.line_total.formatted_with_code}</p>
                      </div>
                    </PriceRow>
                    <RemoveButton onClick={(e) => handleRemove(e, item.id)}>Remove</RemoveButton>
                  </ItemRow>
                </BoardsBox>
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
