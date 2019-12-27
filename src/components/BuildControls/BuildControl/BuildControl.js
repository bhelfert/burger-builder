import PropTypes from 'prop-types';
import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = props =>
    <div className={styles.buildControl}>
        <div className={styles.label}>{props.label}</div>
        <button className={styles.less} onClick={props.onRemoveIngredient} disabled={props.isRemoveIngredientDisabled}>Less</button>
        <button className={styles.more} onClick={props.onAddIngredient}>More</button>
    </div>;

BuildControl.propTypes = {
    isRemoveIngredientDisabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onAddIngredient: PropTypes.func.isRequired,
    onRemoveIngredient: PropTypes.func.isRequired
};

export default BuildControl;