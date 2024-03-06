import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Header,
  Logo,
  Page,
  Search,
  About,
  AboutTitle,
  AboutContent,
  BoardsBox,
  BoardsContent,
  LoadingContainer,
  CustomLink,
  SearchContainer,
  AutocompleteList,
  ListItem,
} from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import Product from '../Shop/Product';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import CartButton from '../CartButton';
import { useRecoilState } from 'recoil';
import productsState from '../../atoms/shop/productsState';
import { getProducts } from '../../common/shop/products';
import SocialMedia from '../Shop/SocialMedia';

const Shop = () => {
  const inputRef = useRef(null);
  const [products, setProducts] = useRecoilState(productsState);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const customerEmail = localStorage.getItem('email') ?? '';

  const [sortType, setSortType] = useState('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        setLoading(false);
        setProducts(res?.data);

        setItems(res?.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchSubmit = (keyword) => {
    if (!keyword?.length) {
      setItems(products);
    } else {
      const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));
      setItems(filteredProducts);
    }
    setSuggestions([]);
  };

  const onTextChanged = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions(products.filter((product) => regex.test(product.name)));
    } else {
      setSuggestions([]);
    }
  };

  const suggestionSelected = (value) => {
    handleSearchSubmit(value);
    setSearchTerm(value);
    setSuggestions([]);
  };

  const handleSort = () => {
    if (sortType === 'asc') {
      setSortType('desc');
      const sortedItems = [...items].sort((a, b) => (a.name < b.name ? 1 : -1));
      setItems(sortedItems);
    } else {
      setSortType('asc');
      const sortedItems = [...items].sort((a, b) => (a.name > b.name ? 1 : -1));
      setItems(sortedItems);
    }
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
        </AboutContent>
        <Page>
          <Search>
            <SearchContainer>
              <input type='text' placeholder='Search products..' value={searchTerm} ref={inputRef} onChange={onTextChanged} />
              {suggestions.length > 0 && (
                <AutocompleteList>
                  {suggestions.map((item) => (
                    <ListItem key={item.id} onClick={() => suggestionSelected(item.name)}>
                      {item.name}
                    </ListItem>
                  ))}
                </AutocompleteList>
              )}
            </SearchContainer>
            <input type='submit' value='Search' onClick={() => handleSearchSubmit(searchTerm)} />
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
        {customerEmail?.length ? <CustomLink to='/shop/orders'>My Orders</CustomLink> : null}

        <Categories />
        <BoardsBox>
          <div className='boxbar'>
            <h2>Products</h2>
          </div>
          <button onClick={handleSort}>Sort: {sortType === 'asc' ? 'ASC' : 'DESC'}</button>
          <br />
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
            {loading ? <LoadingContainer>Loading..</LoadingContainer> : products.slice(0, 4).map((product) => <Product key={product.id} product={product} />)}
          </BoardsContent>
        </BoardsBox>
        <br />
        <SocialMedia message={'What a lovely Webshop!'} />
        <FooterSection />
      </Container>
    </>
  );
};

export default Shop;
