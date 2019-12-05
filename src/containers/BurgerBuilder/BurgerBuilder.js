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

    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedAmount = (amountOperator === '+') ? ingredients[type] + 1 : ingredients[type] - 1;
        const updatedIngredients = { ...ingredients };
        updatedIngredients[type] = updatedAmount;
        setIngredients(updatedIngredients);

        const updatedTotalPrice =  (amountOperator === '+') ? totalPrice + INGREDIENT_PRICES[type] : totalPrice - INGREDIENT_PRICES[type];
        setTotalPrice(updatedTotalPrice);
    };

    const handleAddIngredient = type => updateIngredientAmountAndTotalPrice(type, '+');

    const handleRemoveIngredient = type => {
        if (ingredients[type] === 0) {
            return;
        }
        updateIngredientAmountAndTotalPrice(type, '-');
    }

    return (
        <>
            <Burger ingredients={ingredients}/>
            <BuildControls
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                price={totalPrice.toFixed(2)} />
        </>
    );
}

export default BurgerBuilder;