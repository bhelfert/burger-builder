import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './NavigationItem.module.css';

const NavigationItem = props =>
    <li className={styles.navigationItem}>
        <NavLink to={props.link} exact={props.exact} activeClassName={styles.active}>
            {props.children}
        </NavLink>
    </li>

NavigationItem.propTypes = {
    exact: PropTypes.bool,
    link: PropTypes.string.isRequired
};

export default NavigationItem;