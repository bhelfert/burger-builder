import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

const Checkout = () => {

    const [ingredients, setIngredients] = useState({});

    const history = useHistory();
    const location = useLocation();

    // when componentDidMount():
    useEffect(() => {
        const ingredients = {};
        const queryParams = new URLSearchParams(location.search);
        queryParams.forEach((amount, ingredient) => ingredients[ingredient] = amount);
        setIngredients(ingredients);
    }, [location.search]);

    const handleCancelCheckout = () => history.goBack();

    const handleContinueCheckout = () => history.replace('/checkout/contact-data');

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                onCancelCheckout={handleCancelCheckout}
                onContinueCheckout={handleContinueCheckout} />
        </div>
    );
};

export default Checkout;