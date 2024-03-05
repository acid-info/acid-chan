import React, { useEffect, useRef } from 'react';
import { Header, Logo, AboutContent } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignInAuth = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loaded = useRef(false);

  useEffect(() => {
    if (!id) return;

    if (!loaded.current) {
      loaded.current = true;

      const getUser = async () => {
        try {
          const url = new URL('https://api.chec.io/v1/customers/exchange-token');

          const headers = {
            'X-Authorization': 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ token: id }),
          }).then((response) => response.json());

          const { customer_id, jwt } = response;

          localStorage.setItem('login_token', id);
          localStorage.setItem('customer_id', customer_id);
          localStorage.setItem('jwt', jwt);

          navigate('/shop');
        } catch (error) {
          console.error('Failed', error);
        }
      };
      getUser();
    }
  }, [id, loaded]);

  return (
    <>
      <AboutContent>
        <Header>
          <Logo>
            <Link to='/'>
              <img alt='plebchan' src='assets/logo/logo-transparent.png' />
            </Link>
          </Logo>
        </Header>
      </AboutContent>
    </>
  );
};

export default SignInAuth;
