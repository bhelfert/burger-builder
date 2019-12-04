import Burger from '../../components/Burger/Burger';
import React, { useState } from 'react';

const BurgerBuilder = () => {
    const [burger] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    });

    return (
        <>
            <Burger ingredients={burger.ingredients} />
            <div>Build Controls</div>
        </>
    );
}

export default BurgerBuilder;