import React, { useState } from 'react';
import { Header, Logo, AboutContent, CustomLink } from '../styled/views/Home.styled';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Button } from '../styled/Auth.styled';
import SidebarMenu from '../SidebarMenu';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const base_url = window.location.origin;

    try {
      const headers = {
        'X-Authorization': 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const emailUrl = new URL('https://api.chec.io/v1/customers/email-token');

      const response = await fetch(emailUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, base_url: base_url + '/#/auth' }),
      }).then((response) => response.json());

      if (response?.error) {
        throw new Error(response?.error?.message);
      }

      setDone(true);
    } catch (error) {
      console.error('Signup Failed', error);
      toast.error('Commerce.js backend has an issue');
    }
  };

  return (
    <>
      <SidebarMenu />
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
          <Button type='submit'>Sign Up</Button>
          <div>
            <span style={{ color: 'black' }}>or</span> <CustomLink to='/sign-in'>Sign In</CustomLink>
          </div>
        </Form>
      </Container>
      {done && <p style={{ textAlign: 'center', marginTop: '40px' }}>Check your email for a link to sign in</p>}
    </>
  );
};

export default SignUp;
