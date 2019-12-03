import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import React from 'react';
import styles from './Burger.module.css';

const Burger = () =>
    <div className={styles.burger}>
        <BurgerIngredient type='bread-top' />
        <BurgerIngredient type='salad' />
        <BurgerIngredient type='cheese' />
        <BurgerIngredient type='meat' />
        <BurgerIngredient type='bread-bottom' />
    </div>;

export default Burger;