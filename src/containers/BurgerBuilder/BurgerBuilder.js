import axios from '../../axios-orders';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/Modal/Modal';
import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const fetchIngredients = async () => {
            const result = await axios.get('ingredients.json');
            const updatedBurger = { ...burger };
            updatedBurger.ingredients = result.data;
            setBurger(updatedBurger);
        };

        fetchIngredients();
    // eslint-disable-next-line
    }, []);

    const getFormattedPrice = () => burger.totalPrice.toFixed(2);

    const handleAddIngredient = type => updateIngredientAmountAndTotalPrice(type, '+');

    const handleCancelCheckout = () => setCheckout(false);

    const handleContinueCheckout = () =>
        axios.post('/orders.json', { ...burger })
            .then(response => console.log(response))
            .catch(error => console.log(error));

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
            <Modal show={checkout} onModalClosed={handleCancelCheckout} >
                <OrderSummary
                    ingredients={burger.ingredients}
                    price={getFormattedPrice()}
                    onCancelCheckout={handleCancelCheckout}
                    onContinueCheckout={handleContinueCheckout} />
            </Modal>
            <Burger ingredients={burger.ingredients}/>
            <BuildControls
                onAddIngredient={handleAddIngredient}
                onCheckout={() => setCheckout(true)}
                onRemoveIngredient={handleRemoveIngredient}
                price={getFormattedPrice()}
                removeIngredientDisabledInfo={removeIngredientDisabledInfo} />
        </>
    );
}

export default BurgerBuilder;