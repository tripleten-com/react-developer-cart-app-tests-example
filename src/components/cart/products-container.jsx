import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import styles from './products-container.module.css';
import { ProductContainer } from './product-container';
import { Input } from '../../ui/input/input';
import { MainButton } from '../../ui/main-button/main-button';
import { PromoButton } from '../../ui/promo-button/promo-button';
import { useDispatch, useSelector } from 'react-redux';
import { applyPromo, getItems } from '../../services/thunks';
import { Loader } from '../../ui/loader/loader';

export const ProductsContainer = () => {
  const dispatch = useDispatch();
  const { items, promoCode, promoDiscount, promoRequest, promoFailed, itemsRequest } = useSelector(
    state => state.cart
  );
  const inputRef = useRef(null);

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  const applyPromoCode = useCallback(
    () => {
      dispatch(applyPromo(inputRef.current.value));
    },
    [inputRef, dispatch]
  );

  const content = useMemo(
    () => {
      return itemsRequest ? (
        <Loader size="large" />
      ) : (
        items.map((item, index) => {
          return <ProductContainer key={index} {...item} />;
        })
      );
    },
    [itemsRequest, items]
  );
  const promoCodeStatus = useMemo(
    () => {
      return promoFailed ? (
        <p className={styles.text}>An error occurred! The promo code you entered is invalid. Please try again</p>
      ) : promoRequest ? (
        ''
      ) : !!promoCode && !!promoDiscount ? (
        <p className={styles.text}>Promo code applied successfully!</p>
      ) : (
        ''
      );
    },
    [promoRequest, promoDiscount, promoFailed, promoCode]
  );

  return (
    <div className={`${styles.container}`}>
      {content}
      <div className={styles.promo}>
        <div className={styles.inputWithBtn}>
          <Input
            type="text"
            placeholder="Enter promo code"
            extraClass={styles.input}
            inputWithBtn={true}
            inputRef={inputRef}
          />
          <MainButton
            type="button"
            extraClass={styles.promo_button}
            inputButton={true}
            onClick={applyPromoCode}
          >
            {promoRequest ? <Loader size="small" inverse={true} /> : 'Apply'}
          </MainButton>
        </div>
        {!!promoCode && !!promoDiscount && (
          <PromoButton extraClass={styles.promocode}>{promoCode}</PromoButton>
        )}
      </div>
      {promoCodeStatus}
    </div>
  );
};
