import PropTypes from 'prop-types';
import React from 'react';
import styles from './Order.module.css';

const Order = props => {
    const ingredientsWithAmounts = Object.entries(props.ingredients).map(([ingredient, amount]) =>
        <span key={ingredient}
              style={{
                  border: "1px solid #ccc",
                  display: "inline-block",
                  margin: "0 8px",
                  padding: "5px",
                  textTransform: "capitalize"
              }}>
            {ingredient} ({amount})
        </span>)

    return (
        <div className={styles.order}>
            <p>Ingredients: {ingredientsWithAmounts}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

Order.propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired
};

export default Order;