import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.module.css';

const Toolbar = props =>
    <header className={styles.toolbar}>
        <DrawerToggle onClick={props.onDrawerToggleClick} />
        <div className={styles.logo}>
            <Logo />
        </div>
        <nav className={styles.desktopOnly}>
            <NavigationItems />
        </nav>
    </header>;

Toolbar.propTypes = {
    onDrawerToggleClick: PropTypes.func.isRequired
}

export default Toolbar;