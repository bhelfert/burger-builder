import NavigationItem from "./NavigationItem/NavigationItem";
import React from 'react';
import styles from './NavigationItems.module.css';

const NavigationItems = () =>
    <ul className={styles.navigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>;

export default NavigationItems;