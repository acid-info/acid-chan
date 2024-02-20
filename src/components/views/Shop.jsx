import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Header, Logo, Page, Search, About, AboutTitle, AboutContent } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';

const TEMP_PRODUCTS_DATA = [{ id: 1, name: 'Acid Tshirt 1', price: 40, src }];

const Shop = () => {
  const inputRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Shop | AcidChan</title>
      </Helmet>
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
            <input type='submit' value='Search' />
          </Search>
          <About>
            <AboutTitle>
              <h2>Products</h2>
            </AboutTitle>
            <AboutContent>
              <div id='content'>
                <p>
                  AcidChan is a serverless, adminless, decentralized alternative culture where anyone can free their minds. We're self organized into a self-organization,
                  We're a video game, We're a masterplan, We're an investment fund, We're a rave, We're saving the internet, We're God's little warriors, We're Lindy,
                  We're network commandos, we're clear pilled, we're lawyered up in the court of clout. The working technology comes in part from the 
                  <a href='https://logos.co/technology' target='_blank' rel='noreferrer'>
                    {' '}
                    Logos Technology Stack{' '}
                  </a>{' '}
                  protocols using Waku and Codex. it's all text including links from which media is embedded, shared peer-to-peer. Users do not need to register an
                  account before participating in the community. Feel free to click on a tab below that interests you and jump right in!{' '}
                </p>
                <br />
                <p>There are no global rules, each tab is completely independent and its owner decides how/if it should be moderated.</p>
              </div>
            </AboutContent>
          </About>
        </Page>
      </Container>
    </>
  );
};

export default Shop;
