import axios from '../../axios-orders';
import AxiosErrorHandler from "../../hoc/AxiosErrorHandler/AxiosErrorHandler";
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import React, {useEffect, useState} from 'react';
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
        error: false,
        ingredients: null,
        loading: false,
        totalPrice: 0
    });

    // when componentDidMount():
    useEffect(() => {
        const fetchIngredients = async () => {
            updateLoading(true);
            const stateToMerge = { loading: false };
            try {
                const result = await axios('ingredients.json');
                stateToMerge.ingredients = result.data;
            }
            catch (error) {
                console.error('could not fetch burger ingredients:', error.message);
                stateToMerge.error = true;
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
                const result = await axios.post('/orders.json', { ...burger.ingredients });
                console.info('posted order:', burger.ingredients, ' -- result:', result);
            }
            catch (error) {
                console.error('could not post order:', error.message);
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

    const updateCheckout = isCheckout => updateBurger({ checkout: isCheckout });

    const updateLoading = isLoading => updateBurger({ loading: isLoading });

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedBurger = { ...burger };
        updatedBurger.ingredients[type] = (amountOperator === '+') ? burger.ingredients[type] + 1 : burger.ingredients[type] - 1;
        updatedBurger.totalPrice = (amountOperator === '+') ? burger.totalPrice + INGREDIENT_PRICES[type] : burger.totalPrice - INGREDIENT_PRICES[type];
        setBurger(updatedBurger);
    };

    const removeIngredientDisabledInfo = { ...burger.ingredients };
    Object.entries(removeIngredientDisabledInfo).forEach(([ingredient, amount]) => removeIngredientDisabledInfo[ingredient] = amount === 0);

    let orderSummaryOrSpinnerOrNull = null;
    let burgerAndControlsOrSpinner = burger.error ? <p>Burger ingredients cannot be loaded!</p> : <Spinner />;

    if (burger.ingredients) {
        orderSummaryOrSpinnerOrNull =
            <OrderSummary
                ingredients={burger.ingredients}
                price={getFormattedPrice()}
                onCancelCheckout={handleCancelCheckout}
                onContinueCheckout={handleContinueCheckout}/>;

        burgerAndControlsOrSpinner =
            <>
                <Burger ingredients={burger.ingredients}/>
                <BuildControls
                    onAddIngredient={handleAddIngredient}
                    onCheckout={() => updateCheckout(true)}
                    onRemoveIngredient={handleRemoveIngredient}
                    price={getFormattedPrice()}
                    removeIngredientDisabledInfo={removeIngredientDisabledInfo}/>
            </>;
    };

    if (burger.loading) {
        orderSummaryOrSpinnerOrNull = <Spinner />;
    }

    return (
        <AxiosErrorHandler axios={axios}>
            <Modal show={burger.checkout} onModalClosed={handleCancelCheckout}>
                {orderSummaryOrSpinnerOrNull}
            </Modal>
            {burgerAndControlsOrSpinner}
        </AxiosErrorHandler>
    );
};

export default BurgerBuilder;