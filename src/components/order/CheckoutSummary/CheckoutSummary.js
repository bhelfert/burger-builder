import Button from "../../ui/Button/Button";
import Burger from "../../Burger/Burger";
import PropTypes from 'prop-types';
import React from 'react';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = props =>
    <div className={styles.checkoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: "100%", height: "300px", margin: "auto"}}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button onClick={props.onCancelCheckout} type='cancel'>CANCEL</Button>
        <Button onClick={props.onContinueCheckout} type='ok'>CONTINUE</Button>
    </div>;

CheckoutSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    onCancelCheckout: PropTypes.func.isRequired,
    onContinueCheckout: PropTypes.func.isRequired
};

export default CheckoutSummary;