import styled from 'styled-components';
import { BoardsBox } from '../styled/views/Home.styled';
import { useState } from 'react';
import { getCart, removeItemFromCart, updateItemInCart } from '../../common/shop/cart';
import { useSetRecoilState } from 'recoil';
import cartCountState from '../../atoms/shop/cartCountState';
import { toast } from 'react-toastify';

const ItemRow = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 32px;
  margin-left: 32px;

  p {
    font-size: 16px;
    margin-top: unset;
    margin-bottom: unset;
  }
`;

const RemoveButton = styled.button`
  margin-left: auto;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 8px;
  font-size: 16px;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductData = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  padding-top: 6px;
`;

const CartProduct = (props) => {
  const { item, cart, cartInfo, setCartInfo } = props;
  const [quantity, setQuantity] = useState(item?.quantity);

  const setCartCount = useSetRecoilState(cartCountState);

  const handleRemove = async (e, line_item_id) => {
    e.preventDefault();
    await removeItemFromCart(cartInfo?.id, line_item_id);

    toast('Removed the Item', {
      position: 'top-center',
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      progress: undefined,
    });

    if (cart) {
      const newCartInfo = await getCart(cart?.id);
      setCartInfo(newCartInfo);
      setCartCount(newCartInfo?.line_items?.length || 0);
    } else {
      const newCartInfo = await getCart(localStorage.getItem('cartId'));
      setCartInfo(newCartInfo);
      setCartCount(newCartInfo?.line_items?.length || 0);
    }
  };

  const handleQuantityChange = async (e, line_item_id) => {
    setQuantity(e.target.value);

    await updateItemInCart(cartInfo?.id, line_item_id, {
      quantity: e.target.value,
    });
  };

  return (
    <>
      <BoardsBox>
        <ItemRow>
          <div>
            <h3>{item.name}</h3>
            <div>
              <img src={item.image.url} alt={item.name} width={100} height={100} />
            </div>
          </div>
          <PriceRow>
            <PriceInfo>
              <p>Price</p>
              <ProductData>{item.price.formatted_with_symbol}</ProductData>
            </PriceInfo>
            <PriceInfo>
              <p>Quantity</p>
              {/* <p>{item.quantity}</p> */}
              <QuantityInput type='number' min={1} defaultValue={quantity} onChange={(e) => handleQuantityChange(e, item.id)} />
            </PriceInfo>
            <PriceInfo>
              <p>Total</p>
              <ProductData>{item.price.raw * quantity} USD</ProductData>
            </PriceInfo>
          </PriceRow>
          <RemoveButton onClick={(e) => handleRemove(e, item.id)}>Remove</RemoveButton>
        </ItemRow>
      </BoardsBox>
    </>
  );
};

export default CartProduct;
