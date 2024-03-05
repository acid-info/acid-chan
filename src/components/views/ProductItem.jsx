import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, BoardsBox, BoardsContent, CustomLink } from '../styled/views/Home.styled';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import { useEffect, useState } from 'react';
import { createCart, addItemToCart } from '../../common/shop/cart';
import CartButton from '../CartButton';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cartCountState from '../../atoms/shop/cartCountState';
import cartState from '../../atoms/shop/cartState';
import { getProduct } from '../../common/shop/products';

const Image = styled.img`
  max-width: unset !important;
  max-height: unset !important;
  width: 100%;
`;

const Description = styled.div`
  text-align: left;
  font-size: 16px;
  padding: 12px;
`;

const ProductItem = () => {
  const { id: productId } = useParams();
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);
  const setCartCount = useSetRecoilState(cartCountState);
  const [product, setProduct] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCart = async () => {
      const cart = await createCart();
      setCart(cart);
      localStorage.setItem('cartId', cart.id);
    };
    handleCart();
  }, []);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await getProduct(productId);
        setLoading(false);
        console.log('res:', res);
        setProduct(res);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handlePurchase = async () => {
    const items = await addItemToCart(cart?.id, {
      id: 'prod_8XO3wp77QNlYAz',
      quantity: quantity,
    });

    setCartCount(items?.line_items?.length || 0);

    alert('Item added to cart');
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Shop | AcidChan</title>
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
        {loading ? (
          <div>Loading..</div>
        ) : (
          <BoardsBox>
            <div className='board' key={productId}>
              <div className='boxbar'>
                <h2>{product?.name}</h2>
              </div>
              <BoardsContent>
                <Image src={product?.image?.url} alt='post' />
                <p>{product?.price?.raw} USD</p>
                <Description dangerouslySetInnerHTML={{ __html: product?.description }}></Description>

                <br />
                <div>
                  <p>Quantity:</p>
                  <input type='number' placeholder='Quantity' defaultValue={1} min={1} style={{ width: '50px' }} onChange={handleQuantityChange} />
                </div>
                <br />
                <br />
                <div>
                  <button onClick={handlePurchase}>Add to Cart</button>
                </div>
                <br />
                <br />
              </BoardsContent>
            </div>
          </BoardsBox>
        )}
        <br /> <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default ProductItem;
