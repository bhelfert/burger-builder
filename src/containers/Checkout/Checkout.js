import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import React, { useEffect, useState } from 'react';

const Checkout = props => {

    const [ingredients, setIngredients] = useState({});

    // when componentDidMount():
    useEffect(() => {
        const ingredients = {};
        const queryParams = new URLSearchParams(props.location.search);
        queryParams.forEach((amount, ingredient) => ingredients[ingredient] = amount);
        setIngredients(ingredients);
    }, [props.location.search]);

    const handleCancelCheckout = () => props.history.goBack();

    const handleContinueCheckout = () => props.history.replace('/checkout/contact-data');

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