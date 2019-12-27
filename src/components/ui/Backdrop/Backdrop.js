import PropTypes from 'prop-types';
import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = props => props.isShown && <div className={styles.backdrop} onClick={props.onClick}></div>;

Backdrop.propTypes = {
    isShown: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Backdrop;