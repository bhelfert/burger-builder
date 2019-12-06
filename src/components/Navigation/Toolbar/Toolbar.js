import Logo from "../../Logo/Logo";
import React from 'react';
import styles from './Toolbar.module.css';

const Toolbar = () =>
    <header className={styles.toolbar}>
        <div>MENU</div>
        <Logo />
        <div>...</div>
        <nav>
        </nav>
    </header>;

export default Toolbar;