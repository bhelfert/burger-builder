import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import React, {useState} from 'react';

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    });

    const changeIngredientAmount = (type, newAmountOperator) => {
        const newAmount = (newAmountOperator === '+') ? ingredients[type] + 1 : ingredients[type] - 1;
        const newIngredients = { ...ingredients };
        newIngredients[type] = newAmount;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = type => changeIngredientAmount(type, '+');

    const handleRemoveIngredient = type => changeIngredientAmount(type, '-');

    return (
        <>
            <Burger ingredients={ingredients}/>
            <BuildControls onAddIngredient={handleAddIngredient} onRemoveIngredient={handleRemoveIngredient} />
        </>
    );
}

export default BurgerBuilder;