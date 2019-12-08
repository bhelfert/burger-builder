import React, { useState } from 'react';
import styles from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const handleDrawerToggleClick = () => setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);

    return (
        <>
            <Toolbar onDrawerToggleClick={handleDrawerToggleClick} />
            <SideDrawer opened={showSideDrawer} onClose={() => setShowSideDrawer(false)} />
            <main className={styles.content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;