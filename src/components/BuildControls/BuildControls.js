import BuildControl from "./BuildControl/BuildControl";
import React from 'react';
import styles from './BuildControls.module.css';

const LABELS = ['Salad', 'Bacon', 'Cheese', 'Meat'];

const BuildControls = () =>
    <div className={styles.buildControls}>
        {LABELS.map(label => <BuildControl key={label.toLowerCase()} label={label} />)}
    </div>;

export default BuildControls;