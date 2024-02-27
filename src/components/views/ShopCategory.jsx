import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Header, Logo, Page, Search, AboutContent, BoardsBox, BoardsContent, CustomLink } from '../styled/views/Home.styled';
import { Link, useParams } from 'react-router-dom';
import Product from '../Shop/Product';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import { TEMP_PRODUCTS_DATA } from './Shop';
import SidebarMenu from '../SidebarMenu';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// function capitalizeFirstLetterAndRemoveHyphens(string) {
//   var stringWithoutHyphens = string.replace(/-/g, '');
//   return stringWithoutHyphens.charAt(0).toUpperCase() + stringWithoutHyphens.slice(1);
// }

const Shop = () => {
  const { category } = useParams();
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');

  const handleSearchSubmit = () => {
    setKeyword(inputRef.current.value);
  };

  const items = TEMP_PRODUCTS_DATA.filter((item) => item.category === category).filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <>
      <Helmet>
        <title>{capitalizeFirstLetter(category)} | AcidChan</title>
      </Helmet>
      <SidebarMenu />
      <Container>
        <AboutContent>
          <Header>
            <Logo>
              <Link to='/'>
                <img alt='acidchan' src='assets/logo/logo-transparent.png' />
              </Link>
            </Logo>
          </Header>
        </AboutContent>
        <Page>
          <Search>
            <input type='text' placeholder='Search products..' ref={inputRef} />
            <input type='submit' value='Search' onClick={handleSearchSubmit} />
          </Search>
        </Page>
        <br />
        <CustomLink to='/shop'>Back to shop</CustomLink>
        <Categories />
        <BoardsBox>
          <div className='boxbar'>
            <h2>{capitalizeFirstLetter(category)} </h2>
          </div>
          <BoardsContent>{items?.length ? items.map((product) => <Product key={product.id} product={product} />) : <h2>No products found</h2>}</BoardsContent>
        </BoardsBox>
        <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default Shop;
