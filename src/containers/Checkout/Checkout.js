import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const Checkout = () => {
    const PRICE_PARAM = 'price';

    const [state, setState] = useState({
        ingredients: null,
        price: 0
    });

    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    // when componentDidMount():
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const passedPrice = queryParams.get(PRICE_PARAM);
        queryParams.delete(PRICE_PARAM);

        const passedIngredients = {};
        queryParams.forEach((amount, ingredient) => passedIngredients[ingredient] = Number.parseInt(amount));

        setState({
            ingredients: passedIngredients,
            price: passedPrice
        });
    // eslint-disable-next-line
    }, []);

    const handleCancelCheckout = () => history.goBack();

    const handleContinueCheckout = () => history.replace('/checkout/contact-data');

    const checkoutSummaryAndContactDataOrNull = state.ingredients &&
        <div>
              <CheckoutSummary
                  ingredients={state.ingredients}
                  onCancelCheckout={handleCancelCheckout}
                  onContinueCheckout={handleContinueCheckout} />
              <Route
                  path={match.path + '/contact-data'}
                  render={() => <ContactData ingredients={state.ingredients} price={state.price} />} />
        </div>;

    return (
        <>
            {checkoutSummaryAndContactDataOrNull}
        </>
    );
};

export default Checkout;