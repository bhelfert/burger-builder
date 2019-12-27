import NavigationItem from './NavigationItem/NavigationItem';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './NavigationItems.module.css';

const NavigationItems = props =>
    <ul className={styles.navigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated && <NavigationItem link='/orders'>Orders</NavigationItem>}
        {!props.isAuthenticated
            ? <NavigationItem link='/auth'>Sign In or Up</NavigationItem>
            : <NavigationItem link='/logout'>Log Out</NavigationItem>}
    </ul>;

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default NavigationItems;