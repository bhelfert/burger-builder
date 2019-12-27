import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const handleDrawerToggleClick = () => setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);

    return (
        <>
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                onDrawerToggleClick={handleDrawerToggleClick} />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                isOpened={showSideDrawer}
                onClose={() => setShowSideDrawer(false)} />
            <main className={styles.content}>
                {props.children}
            </main>
        </>
    );
};

Layout.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default Layout;