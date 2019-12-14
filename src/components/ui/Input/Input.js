import PropTypes from 'prop-types';
import React from 'react';
import styles from './Input.module.css';

const Input = props =>
    <div className={styles.input}>
        <label className={styles.label} htmlFor={props.name}>{props.label}</label>
        <input className={styles.input} {...props} />
    </div>

Input.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Input;