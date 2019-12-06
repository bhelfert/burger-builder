import PropTypes from 'prop-types';
import React from 'react';
import styles from './NavigationItem.module.css';

const NavigationItem = props =>
    <li className={styles.navigationItem}>
        <a href={props.link} className={props.active ? styles.active : null}>
            {props.children}
        </a>
    </li>

NavigationItem.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string.isRequired
};

export default NavigationItem;