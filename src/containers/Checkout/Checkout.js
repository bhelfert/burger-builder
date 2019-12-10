import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Checkout = () => {

    const [ingredients, setIngredients] = useState({});

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const passedIngredients = {};
        const queryParams = new URLSearchParams(location.search);
        queryParams.forEach((amount, ingredient) => passedIngredients[ingredient] = Number.parseInt(amount));
        setIngredients(passedIngredients);
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