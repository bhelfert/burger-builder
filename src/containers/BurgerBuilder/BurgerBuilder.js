import axios from '../../axios-orders';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import React, { useEffect, useState } from 'react';
import Spinner from "../../components/Spinner/Spinner";

const BurgerBuilder = () => {
    const INGREDIENT_PRICES = {
      salad: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3
    };

    const [burger, setBurger] = useState({
        checkout: false,
        ingredients: null,
        loading: true,
        totalPrice: 0
    });

    // when componenDidMount():
    useEffect(() => {
        const fetchIngredients = async () => {
            updateLoading(true);
            let result;
            try {
                result = await axios.get('ingredients.json');
            }
            catch (error) {
                console.log(error);
            }
            let stateToMerge = { loading: false };
            if (result != null) {
                stateToMerge.ingredients = result.data;
            }
            updateBurger(stateToMerge);
        };

        fetchIngredients();
    // eslint-disable-next-line
    }, []);

    const getFormattedPrice = () => burger.totalPrice.toFixed(2);

    const handleAddIngredient = type => updateIngredientAmountAndTotalPrice(type, '+');

    const handleCancelCheckout = () => updateCheckout(false);

    const handleContinueCheckout = () => {
        const postOrder = async () => {
            updateLoading(true);
            try {
                const result = await axios.post('/orders.json', { ...burger });
                console.log(result);
            }
            catch (error) {
                console.log(error);
            }
            updateBurger({ loading: false, checkout: false });
        };
        postOrder();
    };

    const handleRemoveIngredient = type => {
        if (burger.ingredients[type] === 0) {
            return;
        }
        updateIngredientAmountAndTotalPrice(type, '-');
    };

    const updateBurger = stateToMerge => {
        const updatedBurger = { ...burger };
        Object.entries(stateToMerge).forEach(([key, value]) => updatedBurger[key] = value);
        setBurger(updatedBurger);
    };

    const updateCheckout = checkout => updateBurger({ checkout: checkout });

    const updateLoading = loading => updateBurger({ loading: loading });

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedBurger = { ...burger };
        updatedBurger.ingredients[type] = (amountOperator === '+') ? burger.ingredients[type] + 1 : burger.ingredients[type] - 1;
        updatedBurger.totalPrice = (amountOperator === '+') ? burger.totalPrice + INGREDIENT_PRICES[type] : burger.totalPrice - INGREDIENT_PRICES[type];
        setBurger(updatedBurger);
    };

    const removeIngredientDisabledInfo = { ...burger.ingredients }
    Object.entries(removeIngredientDisabledInfo).forEach(([ingredient, amount]) => removeIngredientDisabledInfo[ingredient] = amount === 0);

    let orderSummaryOrSpinnerOrNull = burger.loading
        ? burger.checkout ? <Spinner /> : null
        : <OrderSummary
              ingredients={burger.ingredients}
              price={getFormattedPrice()}
              onCancelCheckout={handleCancelCheckout}
              onContinueCheckout={handleContinueCheckout} />;

    let burgerAndControlsOrSpinner = burger.loading && !burger.checkout
        ? <Spinner />
        : <>
            <Burger ingredients={burger.ingredients}/>
            <BuildControls
                onAddIngredient = {handleAddIngredient}
                onCheckout={() => updateCheckout(true)}
                onRemoveIngredient={handleRemoveIngredient}
                price={getFormattedPrice()}
                removeIngredientDisabledInfo={removeIngredientDisabledInfo} />
        </>;

    return (
        <>
            <Modal show={burger.checkout} onModalClosed={handleCancelCheckout} >
                {orderSummaryOrSpinnerOrNull}
            </Modal>
            {burgerAndControlsOrSpinner}
        </>
    );
}

export default BurgerBuilder;