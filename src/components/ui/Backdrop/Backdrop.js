import PropTypes from 'prop-types';
import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = props => props.show ? <div className={styles.backdrop} onClick={props.onClick}></div> : null;

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default Backdrop;