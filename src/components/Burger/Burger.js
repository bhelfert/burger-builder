import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import React from 'react';
import styles from './Burger.module.css';

const Burger = props => {
    const ingredients = Object.keys(props.ingredients)
        .map(ingredient => [...Array(props.ingredients[ingredient])]
            .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient} />));

    return (
        <div className={styles.burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

export default Burger;