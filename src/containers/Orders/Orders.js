import axios from '../../axios-orders';
import AxiosErrorHandler from '../../hoc/AxiosErrorHandler/AxiosErrorHandler';
import Order from '../../components/Order/Order';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/ui/Spinner/Spinner';

const Orders = props => {
    const [state, setState] = useState({
        isError: false,
        orders: null,
        isLoading: true
    });

    // when componentDidMount():
    useEffect(() => {
        const fetchOrders = async () => {
            updateState({ isLoading: true });
            const stateToMerge = { isError: false, isLoading: false };
            try {
                const result = await axios('/orders.json?auth=' + props.authToken);
                stateToMerge.orders = [];
                for (let key in result.data) {
                    stateToMerge.orders.push({
                        ...result.data[key],
                        id: key
                    });
                }
            }
            catch (error) {
                console.error('could not fetch orders:', error.message);
                stateToMerge.isError = true;
            }
            updateState(stateToMerge);
        };

        fetchOrders();
        // eslint-disable-next-line
    }, []);

    const updateState = stateToMerge => {
        setState(prevState => ({
            ...prevState,
            ...stateToMerge
        }));
    };

    const ordersOrSpinner = state.orders
        ? state.orders.map(order =>
            <Order
                ingredients={order.ingredients}
                key={order.id}
                price={order.price} />)
        : state.isError ? <p>Orders cannot be loaded!</p> : <Spinner />;

    return (
        <AxiosErrorHandler axios={axios}>
            <div>
                {ordersOrSpinner}
            </div>
        </AxiosErrorHandler>
    );
};

Orders.propTypes = {
    authToken: PropTypes.string.isRequired
};

export default Orders;