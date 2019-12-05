import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import React, {useState} from 'react';

const BurgerBuilder = () => {
    const INGREDIENT_PRICES = {
      salad: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3
    };

    const [burger, setBurger] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    });

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedBurger = { ...burger };
        updatedBurger.ingredients[type] = (amountOperator === '+') ? burger.ingredients[type] + 1 : burger.ingredients[type] - 1;
        updatedBurger.totalPrice = (amountOperator === '+') ? burger.totalPrice + INGREDIENT_PRICES[type] : burger.totalPrice - INGREDIENT_PRICES[type];
        setBurger(updatedBurger);
    };

    const handleAddIngredient = type => updateIngredientAmountAndTotalPrice(type, '+');

    const handleRemoveIngredient = type => {
        if (burger.ingredients[type] === 0) {
            return;
        }
        updateIngredientAmountAndTotalPrice(type, '-');
    }

    return (
        <>
            <Burger ingredients={burger.ingredients}/>
            <BuildControls
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                price={burger.totalPrice.toFixed(2)} />
        </>
    );
}

export default BurgerBuilder;