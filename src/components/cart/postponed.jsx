import React from 'react';
import styles from './postponed.module.css';

export const Postponed = () => {
  return (
    <div className={`${styles.postponed}`}>
      <p className={styles.text}>it's empty here.</p>
      <p className={styles.text}>
        You can add items to favorites by dragging the product card from the cart to here.
      </p>
      <p className={styles.text}>You can put them back to the cart in the same way.</p>
    </div>
  );
};
