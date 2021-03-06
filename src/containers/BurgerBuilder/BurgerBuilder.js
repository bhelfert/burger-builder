import axios from '../../axios-orders';
import AxiosErrorHandler from '../../hoc/AxiosErrorHandler/AxiosErrorHandler';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import React, {useEffect, useState} from 'react';
import Spinner from '../../components/ui/Spinner/Spinner';
import { useHistory } from 'react-router-dom';

const BurgerBuilder = () => {
    const INGREDIENT_PRICES = {
      salad: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3
    };

    const [burger, setBurger] = useState({
        isCheckout: false,
        isError: false,
        ingredients: null,
        isLoading: false,
        totalPrice: 0
    });

    const history = useHistory();

    // when componentDidMount():
    useEffect(() => {
        const fetchIngredients = async () => {
            updateLoading(true);
            const stateToMerge = { isError: false, isLoading: false };
            try {
                const result = await axios('ingredients.json');
                stateToMerge.ingredients = result.data;
            }
            catch (error) {
                console.error('could not fetch burger ingredients:', error.message);
                stateToMerge.isError = true;
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
        const queryParams = [];
        Object.entries(burger.ingredients).forEach(([ingredient, amount]) =>
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(amount)));
        queryParams.push(`price=${burger.totalPrice}`);
        const queryString  = queryParams.join('&');
        history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    const handleRemoveIngredient = type => {
        if (burger.ingredients[type] === 0) {
            return;
        }
        updateIngredientAmountAndTotalPrice(type, '-');
    };

    const updateBurger = stateToMerge => {
        setBurger(prevBurger => ({
            ...prevBurger,
            ...stateToMerge
        }));
    };

    const updateCheckout = isCheckout => updateBurger({ isCheckout: isCheckout });

    const updateLoading = isLoading => updateBurger({ isLoading: isLoading });

    const updateIngredientAmountAndTotalPrice = (type, amountOperator) => {
        const updatedBurger = { ...burger };
        updatedBurger.ingredients[type] = (amountOperator === '+') ? burger.ingredients[type] + 1 : burger.ingredients[type] - 1;
        updatedBurger.totalPrice = (amountOperator === '+') ? burger.totalPrice + INGREDIENT_PRICES[type] : burger.totalPrice - INGREDIENT_PRICES[type];
        setBurger(updatedBurger);
    };

    const removeIngredientDisabledInfo = { ...burger.ingredients };
    Object.entries(removeIngredientDisabledInfo).forEach(([ingredient, amount]) => removeIngredientDisabledInfo[ingredient] = amount === 0);

    const orderSummaryOrSpinnerOrNull = burger.isLoading
        ? <Spinner />
        : burger.ingredients && <OrderSummary
                                    ingredients={burger.ingredients}
                                    onCancelCheckout={handleCancelCheckout}
                                    onContinueCheckout={handleContinueCheckout}
                                    price={getFormattedPrice()} />;

    const burgerAndControlsOrSpinner = burger.ingredients
        ? <>
              <Burger ingredients={burger.ingredients}/>
              <BuildControls
                  onAddIngredient={handleAddIngredient}
                  onCheckout={() => updateCheckout(true)}
                  onRemoveIngredient={handleRemoveIngredient}
                  price={getFormattedPrice()}
                  removeIngredientDisabledInfo={removeIngredientDisabledInfo} />
        </>
        : burger.isError ? <p>Burger ingredients cannot be loaded!</p> : <Spinner />;

    return (
        <AxiosErrorHandler axios={axios}>
            <Modal isShown={burger.isCheckout} onModalClosed={handleCancelCheckout}>
                {orderSummaryOrSpinnerOrNull}
            </Modal>
            {burgerAndControlsOrSpinner}
        </AxiosErrorHandler>
    );
};

export default BurgerBuilder;