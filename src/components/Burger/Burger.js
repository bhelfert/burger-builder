import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import React from 'react';
import styles from './Burger.module.css';

const Burger = props => {
    let ingredients = Object.keys(props.ingredients)
        .map(ingredient => [...Array(props.ingredients[ingredient])]
            .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient} />))
        .flat();

    if (ingredients.length === 0) {
        ingredients = <p>Please add some ingredients.</p>
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

export default Burger;