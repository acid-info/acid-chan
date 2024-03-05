import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Header, Logo, AboutContent, BoardsBox, BoardsContent, CustomLink, LoadingContainer } from '../styled/views/Home.styled';
import { Link, useParams } from 'react-router-dom';
import Categories from '../Shop/Categories';
import FooterSection from '../FooterSection';
import SidebarMenu from '../SidebarMenu';
import { getOrders } from '../../common/shop/orders';
import styled from 'styled-components';

const OrderItem = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: left;
  padding: 12px;
  margin: 12px;
  gap: 32px;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
  }
`;

const ShopOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem('email') ?? '';
        const res = await getOrders(email);

        console.log('res:', res);
        setLoading(false);
        setOrders(res?.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [loaded]);

  return (
    <>
      <Helmet>
        <title>Orders | AcidChan</title>
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
        <br />
        <CustomLink to='/shop'>Back to shop</CustomLink>
        <Categories />
        <BoardsBox>
          <BoardsContent>
            {loading ? (
              <LoadingContainer>Loading..</LoadingContainer>
            ) : orders?.length ? (
              orders.map((order) => (
                <OrderItem>
                  <OrderInfo>
                    <p>Date</p>
                    <p>{new Date(order?.created * 1000).toLocaleString()}</p>
                  </OrderInfo>
                  <OrderInfo>
                    <p>Order Value</p>
                    <p>{order?.order_value?.formatted_with_code}</p>
                  </OrderInfo>
                  <OrderInfo>
                    <p>Status</p>
                    <p>{order?.status_payment}</p>
                  </OrderInfo>
                  <OrderInfo>
                    <p>Shipping Address</p>
                    <p>
                      {order?.shipping?.name +
                        ' ' +
                        order?.shipping?.street +
                        ' ' +
                        order?.shipping?.street_2 +
                        ' ' +
                        order?.shipping?.town_city +
                        ' ' +
                        order?.shipping?.postal_zip_code +
                        ' ' +
                        order?.shipping?.county_state +
                        ' ' +
                        order?.shipping?.country}
                    </p>
                  </OrderInfo>
                </OrderItem>
              ))
            ) : (
              <h2>No orders found</h2>
            )}
          </BoardsContent>
        </BoardsBox>
        <br />
        <FooterSection />
      </Container>
    </>
  );
};

export default ShopOrders;
