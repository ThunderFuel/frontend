import React, { useEffect } from "react";
import { AssetEmptyCart } from "assets";
import Button from "components/Button";
import CartItem from "components/CartItem";
import EthereumPrice from "components/EthereumPrice";
import Modal from "components/Modal";
import useNavigate from "hooks/useNavigate";
import { useWallet } from "hooks/useWallet";
import { IconArrowRight } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal, removeAll, toggleCartModal } from "store/cartSlice";
import { setIsInsufficientBalance, toggleCheckoutModal } from "store/checkoutSlice";
import { toggleWalletModal } from "store/walletSlice";
import { PATHS } from "router/config/paths";
import clsx from "clsx";
import { useIsMobile } from "hooks/useIsMobile";

const MyCart = () => {
  const { totalAmount, itemCount, items, show } = useAppSelector((state) => state.cart);
  const { isConnected } = useAppSelector((state) => state.wallet);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hasEnoughFunds } = useWallet();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items, dispatch]);

  const onToggleCheckoutModal = () => {
    if (!isConnected) {
      dispatch(toggleCartModal());
      dispatch(toggleWalletModal());
    } else
      hasEnoughFunds().then((res) => {
        dispatch(setIsInsufficientBalance(!res));
        dispatch(toggleCartModal());
        dispatch(toggleCheckoutModal());
      });
  };
  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full px-5 py-2 justify-between border-b border-gray">
        <span className="text-h6 text-gray-light">Total</span>
        <span className="flex items-center text-white">
          <EthereumPrice price={totalAmount} priceClassName="text-h6" />
        </span>
      </div>
      <div className="flex w-full p-5">
        <Button
          className="w-full btn-primary"
          onClick={() => {
            onToggleCheckoutModal();
          }}
        >
          PROCEED TO CHECKOUT <IconArrowRight />
        </Button>
      </div>
    </div>
  );

  return (
    <Modal className={clsx("cart", useIsMobile() ? "mobile" : "")} title="My Cart" onClose={() => dispatch(toggleCartModal())} show={show} footer={items.length !== 0 ? footer : undefined}>
      <div className="flex flex-col h-full px-5 pt-5">
        {items.length !== 0 ? (
          <>
            <div className="flex justify-between items-center pb-5">
              <span className="text-headlineMd font-bigShoulderDisplay text-white">{itemCount} ITEMS</span>
              <button type="button" className="text-headlineSm font-bigShoulderDisplay text-gray-light" onClick={() => dispatch(removeAll())}>
                CLEAR ALL
              </button>
            </div>
            <div className="flex flex-col h-[calc(100vh-265px)] gap-2 overflow-y-scroll no-scrollbar ">
              {items.map((i, index) => (
                <CartItem
                  // Index shouldn't be used as keys, causes bugs when order of elements change
                  key={i.id}
                  text="Price"
                  name={i.name ?? i.tokenOrder}
                  price={i.price}
                  image={i.image ?? ""}
                  id={i.id}
                  uid={i.uid}
                  isRemovable={true}
                  onClick={() => {
                    navigate(PATHS.NFT_DETAILS, { nftId: i.id });
                    dispatch(toggleCartModal());
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src={AssetEmptyCart} alt="Empty cart" />
            <span className="text-bodyLg font-spaceGrotesk text-gray-light w-[320px] text-center">Your cart is empty. Start adding NFTs to your cart to collect.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MyCart;
