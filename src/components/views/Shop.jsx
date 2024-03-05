import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Header, Logo, Page, Search, About, AboutTitle, AboutContent, BoardsBox, BoardsContent, LoadingContainer } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import Product from '../Shop/Product';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import CartButton from '../CartButton';
import { useRecoilState } from 'recoil';
import productsState from '../../atoms/shop/productsState';
import { getProducts } from '../../common/shop/products';

const Shop = () => {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useRecoilState(productsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        console.log('res:', res);
        setLoading(false);
        setProducts(res?.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchSubmit = () => {
    setKeyword(inputRef.current.value);
  };

  const items = products.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));

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
        </AboutContent>
        <Page>
          <Search>
            <input type='text' placeholder='Search products..' ref={inputRef} />
            <input type='submit' value='Search' onClick={handleSearchSubmit} />
          </Search>
          <About>
            <AboutTitle>
              <h2>AcidChan Webshop</h2>
            </AboutTitle>
            <AboutContent>
              <div id='content'>
                <p>Turn on, tune in, drop out! </p>
                <br />
                <p>
                  Acid chan is digital acid for electronic liberation, a second enlightenment, a decentralized, permissionless, adminless culture. We are God's little
                  warriors and we want YOU to take back the internet. Rejoice in the promised land anon!
                </p>
                <br />
                <p>
                  On Acid chan anyone can create and own unlimited boards. All data comes from the Logos' Stack, based on p2p comms protocol Waku and the Codex
                  decentralised storage engine. Users do not need to register an account before participating in the community. Feel free to click on a board below that
                  interests you and jump right in!
                </p>
              </div>
            </AboutContent>
          </About>
        </Page>
        <br />
        <Categories />
        <BoardsBox>
          <div className='boxbar'>
            <h2>Products</h2>
          </div>
          <BoardsContent>
            {loading ? (
              <LoadingContainer>Loading..</LoadingContainer>
            ) : items?.length ? (
              items?.map((product) => <Product key={product.id} product={product} />)
            ) : (
              <h2>No products found</h2>
            )}
          </BoardsContent>
        </BoardsBox>
        <br />
        <BoardsBox>
          <div className='boxbar'>
            <h2>Featured</h2>
          </div>
          <BoardsContent>
            {loading ? <LoadingContainer>Loading..</LoadingContainer> : items.slice(0, 4).map((product) => <Product key={product.id} product={product} />)}
          </BoardsContent>
        </BoardsBox>
        <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default Shop;
