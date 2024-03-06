import styled from 'styled-components';
import { RedditIcon, RedditShareButton, TwitterShareButton, XIcon } from 'react-share';

const SocialMediaRow = styled.div`
  display: flex;
  gap: 12px;
  margin: auto;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const SocialMedia = ({ message }) => {
  const shareUrl = window.location.href;
  return (
    <SocialMediaRow>
      <TwitterShareButton url={shareUrl} title={message}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton url={shareUrl} title={message}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </SocialMediaRow>
  );
};

export default SocialMedia;
