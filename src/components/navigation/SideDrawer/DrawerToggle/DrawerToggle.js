import PropTypes from 'prop-types';
import React from 'react';
import styles from './DrawerToggle.module.css';

const DrawerToggle = props =>
    <div className={styles.drawerToggle} onClick={props.onClick}>
        <div></div>
        <div></div>
        <div></div>
    </div>;

DrawerToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DrawerToggle;