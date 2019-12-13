import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';
import styles from './NavigationItems.module.css';

const NavigationItems = () =>
    <ul className={styles.navigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>;

export default NavigationItems;