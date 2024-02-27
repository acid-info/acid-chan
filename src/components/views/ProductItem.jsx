import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Logo, AboutContent, BoardsBox, BoardsContent } from '../styled/views/Home.styled';
import { TEMP_PRODUCTS_DATA } from './Shop';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';

const Image = styled.img`
  max-width: unset !important;
  max-height: unset !important;
  width: 100%;
`;

const ProductItem = () => {
  const { id } = useParams();
  const { name, price, src, description } = TEMP_PRODUCTS_DATA.find((product) => String(product.id) === String(id));

  return (
    <>
      <Helmet>
        <title>{name} | AcidChan</title>
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
        <br />
        <Categories />
        <BoardsBox>
          <div className='board' key={id}>
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
                <input type='number' placeholder='Quantity' defaultValue={1} style={{ width: '50px' }} />
              </div>
              <br />
              <br />
              <div>
                <button>Buy</button>
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
