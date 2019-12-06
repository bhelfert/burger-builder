import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

const Button = props =>
    <button
        className={[styles.button, styles[props.type]].join((' '))}
        onClick={props.onClick}>
        {props.children}
    </button>;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['cancel', 'ok']).isRequired
};

export default Button;