import React from 'react';
import styles from './tabs.module.css';
import { Tab } from './tab';
import { useSelector } from 'react-redux';

export const Tabs = () => {
  const currentTab = useSelector(state => state.cart.currentTab);

  return (
    <div className={`${styles.tabs}`}>
      <Tab text="Shopping cart" active={currentTab === 'items'} />
      <Tab text="Favorites" active={currentTab === 'postponed'} />
    </div>
  );
};
