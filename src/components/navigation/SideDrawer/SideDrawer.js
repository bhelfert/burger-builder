import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import PropTypes from 'prop-types';
import React from 'react';
import styles from './SideDrawer.module.css';

const SideDrawer = props => {
    const sideDrawerClasses = [styles.sideDrawer, (props.opened ? styles.open : styles.close)].join(' ');

    return (
        <>
            <Backdrop show={props.opened} onClick={props.onClose}  />
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
}

SideDrawer.propTypes = {
    onClose: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired
};

export default SideDrawer;