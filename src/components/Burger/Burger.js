import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import React from 'react';
import styles from './Burger.module.css';

const Burger = props => {

    // enclosed by the burger breads, meat is on the bottom (position 1) and salad is on the top (position 4)
    const INGREDIENT_TO_POSITION = { salad: 4, bacon: 3, cheese: 2, meat: 1 };

    const byIngredientPosition = (ingredient1, ingredient2) => {
        if (INGREDIENT_TO_POSITION[ingredient1] < INGREDIENT_TO_POSITION[ingredient2]) {
            return 1;
        }
        else if (INGREDIENT_TO_POSITION[ingredient1] > INGREDIENT_TO_POSITION[ingredient2]) {
            return -1;
        }
        throw new Error(`For the ingredient '${ingredient1}' more than one amount is specified with the input data. Please ensure it is only specified once.`);
    };

    let ingredients = Object.keys(props.ingredients)
        .sort(byIngredientPosition)
        .map(ingredient => [...Array(props.ingredients[ingredient])]
            .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient} />))
        .flat();

    if (ingredients.length === 0) {
        ingredients = <p>Please add some ingredients.</p>
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
};

export default Burger;