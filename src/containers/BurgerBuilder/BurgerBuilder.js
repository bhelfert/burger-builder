import Burger from '../../components/Burger/Burger';
import React, { useState } from 'react';

const BurgerBuilder = () => {
    const [burger] = useState({
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
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