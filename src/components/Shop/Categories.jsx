import styled from 'styled-components';

const Container = styled.div`
  font-size: 93%;
  text-align: center;
  clear: both;
  padding-top: 0.5em;
  padding-bottom: 2em;

  ul {
    border-top: 1px solid;
    display: table;
    margin: auto;
    width: 750px;
    padding: 0;
  }

  li {
    background: #fed;
    display: block;
    float: left;
    border: 1px solid;
    padding: 2px 1em 2px 1em;
    border-left: none;
    margin-top: -1px;
    list-style: none;
  }

  .fill {
    border-top: 1x solid;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    background: #ffe;
    width: 10.5%;
  }

  .first {
    border-left: 1px solid;
  }

  a {
    color: #800;
    text-decoration: none;
  }

  @media (max-device-width: 640px) {
    padding-top: 2em;
    padding-bottom: 3em;

    ul {
      width: auto;
      border-top: none;
      line-height: 2;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      row-gap: 10px;
    }

    .fill {
      display: none;
      background: inherit;
    }

    li {
      background: inherit;
      display: inline;
      float: none;
      border: none;
      white-space: nowrap;
    }

    .first {
      border-left: none;
    }

    a {
      color: blue;
      text-decoration: underline;
    }
  }
`;

const Categories = () => {
  return (
    <Container>
      <ul>
        <li className='fill'></li>
        <li className='first'>
          <a href='/#/shop/t-shirts' rel='noopener noreferrer'>
            T-shirts
          </a>
        </li>
        <li>
          <a href='/#/shop/caps' rel='noopener noreferrer'>
            Caps
          </a>
        </li>
        <li>
          <a href='/#/shop/tote-bags' rel='noopener noreferrer'>
            Tote Bags
          </a>
        </li>
        <li>
          <a href='/#/shop/tote-bag' rel='noopener noreferrer'>
            Hoodies
          </a>
        </li>
        <li>
          <a href='/#/shop/stickers' rel='noopener noreferrer'>
            Stickers
          </a>
        </li>
        <li>
          <a href='/#/shop/badges' rel='noopener noreferrer'>
            Badges
          </a>
        </li>
        <li>
          <a href='/#/shop/flags' rel='noopener noreferrer'>
            Flags
          </a>
        </li>
        <li>
          <a href='/#/shop/mousepads' rel='noopener noreferrer'>
            Mousepads
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default Categories;
