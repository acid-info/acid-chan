import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Header, Logo, Page, Search, About, AboutTitle, AboutContent, BoardsBox, BoardsContent } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import Product from '../Shop/Product';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';

export const TEMP_PRODUCTS_DATA = [
  {
    id: 1,
    category: 't-shirts',
    name: 'Acid Tshirt 1',
    price: 10,
    src: '/shop/A3.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    category: 't-shirts',
    name: 'Acid Tshirt 2',
    price: 20,
    src: '/shop/A4.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    category: 't-shirts',
    name: 'Acid Tshirt 3',
    price: 30,
    src: '/shop/A3.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    category: 't-shirts',
    name: 'Acid Tshirt 4',
    price: 40,
    src: '/shop/A4.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 5,
    category: 't-shirts',
    name: 'Acid Tshirt 5',
    price: 50,
    src: '/shop/A3.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 6,
    category: 't-shirts',
    name: 'Acid Tshirt 6',
    price: 60,
    src: '/shop/A4.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 7,
    category: 't-shirts',
    name: 'Acid Tshirt 7',
    price: 70,
    src: '/shop/A3.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.n',
  },
  {
    id: 8,
    category: 't-shirts',
    name: 'Acid Tshirt 8',
    price: 80,
    src: '/shop/A4.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const Shop = () => {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');

  const handleSearchSubmit = () => {
    setKeyword(inputRef.current.value);
  };

  const items = TEMP_PRODUCTS_DATA.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <>
      <Helmet>
        <title>Shop | AcidChan</title>
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
          <BoardsContent>{items?.length ? items?.map((product) => <Product key={product.id} product={product} />) : <h2>No products found</h2>}</BoardsContent>
        </BoardsBox>
        <br />
        <BoardsBox>
          <div className='boxbar'>
            <h2>Featured</h2>
          </div>
          <BoardsContent>
            {TEMP_PRODUCTS_DATA.slice(0, 4).map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </BoardsContent>
        </BoardsBox>
        <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default Shop;
