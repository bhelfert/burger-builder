import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const Checkout = () => {
    const [ingredients, setIngredients] = useState(null);

    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    // when componentDidMount():
    useEffect(() => {
        const passedIngredients = {};
        const queryParams = new URLSearchParams(location.search);
        queryParams.forEach((amount, ingredient) => passedIngredients[ingredient] = Number.parseInt(amount));
        setIngredients(passedIngredients);
    // eslint-disable-next-line
    }, []);

    const handleCancelCheckout = () => history.goBack();

    const handleContinueCheckout = () => history.replace('/checkout/contact-data');

    const checkoutSummaryAndContactDataOrNull = ingredients
        ? <div>
              <CheckoutSummary
                  ingredients={ingredients}
                  onCancelCheckout={handleCancelCheckout}
                  onContinueCheckout={handleContinueCheckout} />
              <Route
                  path={match.path + '/contact-data'}
                  render={() => <ContactData ingredients={ingredients} />} />
        </div>
        : null;

    return (
        <>
            {checkoutSummaryAndContactDataOrNull}
        </>
    );
};

export default Checkout;