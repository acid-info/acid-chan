import { Footer } from './styled/views/Home.styled';

import packageJson from '../../package.json';

const { version } = packageJson;
const commitRef = process?.env?.REACT_APP_COMMIT_REF ? ` ${process.env.REACT_APP_COMMIT_REF.slice(0, 7)}` : '';

const FooterSection = () => {
  return (
    <>
      <Footer>
        <ul>
          <li className='fill'></li>
          <li className='first'>
            <a href='/#/shop' rel='noopener noreferrer'>
              Shop
            </a>
          </li>
          <li>
            <a href='https://gitcoin.co/grants/5515/plebbit-a-serverless-adminless-decentralized-redd' target='_blank' rel='noopener noreferrer'>
              Donate
            </a>
          </li>
          <li>
            <a href='https://github.com/plebbit/whitepaper/discussions/2' target='_blank' rel='noopener noreferrer'>
              Whitepaper
            </a>
          </li>
          <li>
            <a href='https://github.com/acid-info/acid-chan' target='_blank' rel='noopener noreferrer'>
              GitHub
            </a>
          </li>
          <li>
            <a href='https://logos.co/manifesto' target='_blank' rel='noopener noreferrer'>
              Logos
            </a>
          </li>
          <li>
            <a href='https://t.me/+Hq9qsw5FH2U1OWM0' target='_blank' rel='noopener noreferrer'>
              Telegram
            </a>
          </li>
          <li>
            <a href='https://twitter.com/ac1d_info' target='_blank' rel='noopener noreferrer'>
              Twitter
            </a>
          </li>
          <li>
            <a href='https://discord.gg/SU5GY3zN' target='_blank' rel='noopener noreferrer'>
              Discord
            </a>
          </li>
        </ul>
      </Footer>
      <div
        style={{
          textAlign: 'center',
          fontSize: '11px',
          marginBottom: '2em',
        }}
      >
        AcidChan v{version}
        {commitRef}. GPL-2.0
      </div>
    </>
  );
};
export default FooterSection;
