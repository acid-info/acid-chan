import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomLink } from './styled/views/Home.styled';
import { useResetRecoilState } from 'recoil';
import cartState from '../atoms/shop/cartState';
import cartCountState from '../atoms/shop/cartCountState';
import productsState from '../atoms/shop/productsState';

const SidebarContainer = styled.div`
  width: 250px;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-260px')};
  height: 100vh;
  background: url('assets/fade.png') center top repeat-x rgb(255, 255, 238);
  border-right: 1px solid #ddd;
  transition: left 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${(props) => (props.isOpen ? '250px' : '10px')};
  top: 10px;
  z-index: 11;
  cursor: pointer;
  transition: left 0.15s cubic-bezier(0.4, 0, 0.2, 1);
`;

function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const customer_id = localStorage.getItem('customer_id');
  const resetCart = useResetRecoilState(cartState);
  const resetCartCount = useResetRecoilState(cartCountState);
  const resetProduct = useResetRecoilState(productsState);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('customer_id');
    localStorage.removeItem('cartId');
    localStorage.removeItem('login_token');
    localStorage.removeItem('email');
    localStorage.removeItem('jwt');

    resetCart();
    resetCartCount();
    resetProduct();

    window.location.reload();
  };

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <CustomLink to='/'>
          <MenuItem>Home</MenuItem>
        </CustomLink>
        <CustomLink to='/shop'>
          <MenuItem>Shop</MenuItem>
        </CustomLink>
        {customer_id?.length > 0 ? (
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        ) : (
          <CustomLink to='/sign-in'>
            <MenuItem>Sign In</MenuItem>
          </CustomLink>
        )}
      </SidebarContainer>
    </>
  );
}

export default SidebarMenu;
