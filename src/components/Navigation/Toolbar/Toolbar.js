import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import React from 'react';
import styles from './Toolbar.module.css';

const Toolbar = () =>
    <header className={styles.toolbar}>
        <div>MENU</div>
        <Logo />
        <div>...</div>
        <nav>
            <NavigationItems />
        </nav>
    </header>;

export default Toolbar;