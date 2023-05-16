import React from 'react';
import styles from './checkout-product.module.css';

export const CheckoutProduct = ({ src, text, qty, extraClass }) => {
  return (
    <div className={`${styles.product} ${extraClass}`}>
      <div className={styles.leftbox}>
        <img className={styles.img} src={src} alt="product image." />
        <p className={styles.text}>{text}</p>
      </div>
      <p className={styles.count}>×{qty}</p>
    </div>
  );
};
