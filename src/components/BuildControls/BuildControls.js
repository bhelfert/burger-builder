import BuildControl from "./BuildControl/BuildControl";
import PropTypes from 'prop-types';
import React from 'react';
import styles from './BuildControls.module.css';

const CONTROLS = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = props =>
    <div className={styles.buildControls}>
        <p>Current Price: <strong>{props.price}</strong></p>
        {CONTROLS.map(control =>
            <BuildControl
                key={control.type}
                label={control.label}
                onAddIngredient={() => props.onAddIngredient(control.type)}
                onRemoveIngredient={() => props.onRemoveIngredient(control.type)} />)}
    </div>;

BuildControls.propTypes = {
    onAddIngredient: PropTypes.func.isRequired,
    onRemoveIngredient: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired
};

export default BuildControls;