import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/Modal/Modal';
import React, {useState} from 'react';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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

    const [checkout, setCheckout] = useState(false);

    const handleAddIngredient = type => updateIngredientAmountAndTotalPrice(type, '+');

    const handleRemoveIngredient = type => {
        if (burger.ingredients[type] === 0) {
            return;
        }
        updateIngredientAmountAndTotalPrice(type, '-');
    }

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedBurger = { ...burger };
        updatedBurger.ingredients[type] = (amountOperator === '+') ? burger.ingredients[type] + 1 : burger.ingredients[type] - 1;
        updatedBurger.totalPrice = (amountOperator === '+') ? burger.totalPrice + INGREDIENT_PRICES[type] : burger.totalPrice - INGREDIENT_PRICES[type];
        setBurger(updatedBurger);
    };

    const removeIngredientDisabledInfo = { ...burger.ingredients }
    Object.entries(removeIngredientDisabledInfo).forEach(([ingredient, amount]) => removeIngredientDisabledInfo[ingredient] = amount === 0);

    return (
        <>
            <Modal show={checkout}>
                <OrderSummary ingredients={burger.ingredients} />
            </Modal>
            <Burger ingredients={burger.ingredients}/>
            <BuildControls
                onAddIngredient={handleAddIngredient}
                onCheckout={() => setCheckout(true)}
                onRemoveIngredient={handleRemoveIngredient}
                price={Math.abs(burger.totalPrice.toFixed(2))}
                removeIngredientDisabledInfo={removeIngredientDisabledInfo} />
        </>
    );
}

export default BurgerBuilder;