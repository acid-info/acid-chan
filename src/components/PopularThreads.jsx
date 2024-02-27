import { useComment, useSubplebbit } from '@plebbit/plebbit-react-hooks';
import getCommentMediaInfo from '../utils/getCommentMediaInfo';
import { Link } from 'react-router-dom';
import BoardAvatar from './BoardAvatar';
import OfflineIndicator from './OfflineIndicator';
import useGeneralStore from '../hooks/stores/useGeneralStore';

const PopularThreads = ({ commentCid }) => {
  const comment = useComment({ commentCid });
  const subplebbit = useSubplebbit({ subplebbitAddress: comment?.subplebbitAddress });
  const { setSelectedAddress, setSelectedTitle } = useGeneralStore((state) => state);
  const commentMediaInfo = getCommentMediaInfo(comment);

  return (
    <div className='board' key={`${commentCid}`}>
      <div className='board-title' key='board-title'>
        <span>{subplebbit.title || subplebbit.address}</span>
      </div>
      <div className='board-avatar-container' key='board-avatar-container'>
        <Link
          to={`/p/${comment?.subplebbitAddress}/c/${comment?.cid}`}
          key='link'
          onClick={() => {
            setSelectedTitle(subplebbit?.title);
            setSelectedAddress(comment?.subplebbitAddress);
          }}
        >
          {commentMediaInfo?.type === 'webpage' && commentMediaInfo?.thumbnail ? (
            <img className='board-avatar' src={commentMediaInfo?.thumbnail} alt='post' />
          ) : commentMediaInfo?.type === 'image' ? (
            <img className='board-avatar' src={commentMediaInfo?.url} alt='post' />
          ) : commentMediaInfo?.type === 'video' ? (
            <video className='board-avatar' src={commentMediaInfo?.url} alt='post' />
          ) : commentMediaInfo?.type === 'iframe' && commentMediaInfo?.thumbnail ? (
            <img className='board-avatar' src={commentMediaInfo?.thumbnail} alt='post' />
          ) : (
            <BoardAvatar address={comment.subplebbitAddress} />
          )}
        </Link>
        <OfflineIndicator address={comment?.subplebbitAddress} className='offline-indicator' tooltipPlace='top' key='oi2' />
      </div>
      <div className='board-text' key='bt'>
        {comment?.title ? <b>{comment?.title}</b> : null}
        {comment?.content ? (comment.content.length > 99 ? `: ${comment.content.substring(0, 99)}...` : `: ${comment.content}`) : null}
      </div>
    </div>
  );
};

export default PopularThreads;
