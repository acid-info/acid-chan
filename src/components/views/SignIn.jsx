import React, { useState } from 'react';
import { Header, Logo, AboutContent, CustomLink } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Button } from '../styled/Auth.styled';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to Sign In', { email, password });
    const base_url = window.location.origin;

    try {
      // const url = new URL('https://api.chec.io/v1/customers/exchange-token');

      // const headers = {
      //   'X-Authorization': 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31',
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
      // };

      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: headers,
      //   body: JSON.stringify({ token: 'fasfa' }),
      // }).then((response) => response.json());

      // console.log('Signin Successful', response);
      // // navigate('/shop');

      const url = new URL('https://api.chec.io/v1/customers/email-token');

      const headers = {
        'X-Authorization': 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, base_url: base_url + '/#/auth' }),
      }).then((response) => response.json());

      localStorage.setItem('email', response?.email);
      setDone(true);
    } catch (error) {
      console.error('Signin Failed', error);
    }
  };

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
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          {/* <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /> */}
          <Button type='submit'>Sign In</Button>
          <div>
            <span style={{ color: 'black' }}>or</span> <CustomLink to='/sign-up'>Sign Up</CustomLink>
          </div>
        </Form>
      </Container>
      {done && <p style={{ textAlign: 'center', marginTop: '40px' }}>Check your email for a link to sign in</p>}
    </>
  );
};

export default SignIn;
