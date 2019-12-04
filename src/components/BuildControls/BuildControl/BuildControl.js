import PropTypes from 'prop-types';
import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = props =>
    <div className={styles.buildControl}>
        <div className={styles.label}>{props.label}</div>
        <button className={styles.less} onClick={props.onRemoveIngredient}>Less</button>
        <button className={styles.more} onClick={props.onAddIngredient}>More</button>
    </div>;

BuildControl.propTypes = {
    label: PropTypes.string.isRequired,
    onAddIngredient: PropTypes.func.isRequired,
    onRemoveIngredient: PropTypes.func.isRequired
};

export default BuildControl;