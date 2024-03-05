import React from 'react';
import styled from 'styled-components';
import { CustomLink } from './styled/views/Home.styled';
import { useRecoilValue } from 'recoil';
import cartCountState from '../atoms/shop/cartCountState';

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 30px;
`;

function CartButton() {
  const count = useRecoilValue(cartCountState);
  return (
    <Container>
      <CustomLink to='/cart'>Cart ({count})</CustomLink>
    </Container>
  );
}

export default CartButton;
