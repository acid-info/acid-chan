import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, CustomLink } from '../styled/views/Home.styled';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  justify-content: center;
`;

const FavoriteItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  gap: 12px;

  border: 1px solid rgb(136, 0, 0);
  background-color: white;
  padding: 24px;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 8px;
`;

const ShopFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <>
      <Helmet>
        <title>Favorites | AcidChan</title>
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
        <h2>Favorites</h2>
        <br />
        <Grid>
          {favorites?.length ? (
            favorites.map((item) => {
              return (
                <FavoriteItem key={item?.id}>
                  <p>{item?.name}</p>
                  <Image src={item?.image} alt={item?.name} />
                  <p>{item?.price} USD</p>
                  <a href={`/#/shop/product/${item?.id}`}>
                    <button>See Product</button>
                  </a>
                </FavoriteItem>
              );
            })
          ) : (
            <div>No favorites</div>
          )}
        </Grid>
        <br />
        <br />
        <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default ShopFavorites;
