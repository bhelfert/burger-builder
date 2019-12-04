import BuildControl from "./BuildControl/BuildControl";
import React from 'react';
import styles from './BuildControls.module.css';

const labels = ['Salad', 'Bacon', 'Cheese', 'Meat'];

const BuildControls = () =>
    <div className={styles.buildControls}>
        {labels.map(label => <BuildControl key={label.toLowerCase()} label={label} />)}
    </div>;

export default BuildControls;