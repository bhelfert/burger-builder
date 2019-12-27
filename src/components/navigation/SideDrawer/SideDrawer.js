import Backdrop from '../../ui/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './SideDrawer.module.css';

const SideDrawer = props => {
    const sideDrawerClasses = [styles.sideDrawer, (props.isOpened ? styles.open : styles.close)].join(' ');

    return (
        <>
            <Backdrop isShown={props.isOpened} onClick={props.onClose} />
            <div className={sideDrawerClasses}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

SideDrawer.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SideDrawer;