import axios from "../../../axios-orders";
import Button from "../../../components/ui/Button/Button";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './ContactData.module.css';
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useHistory } from 'react-router-dom';

const ContactData = props => {
    const [state, setState] = useState({
        loading: false
    });

    const history = useHistory();

    const handleClick = event => {
        event.preventDefault();

        const postOrder = async () => {
            updateState({ loading: true });
            try {
                const ingredients = { ...props.ingredients };
                const result = await axios.post('/orders.json', ingredients);
                updateState({ loading: false });
                console.info('posted order:', ingredients, ' -- result:', result);
                history.push('/');
            }
            catch (error) {
                console.error('could not post order:', error.message);
                updateState({ loading: false });
            }
        };
        postOrder();
    };

    const updateState = stateToMerge => {
        const updatedState = { ...state };
        Object.entries(stateToMerge).forEach(([key, value]) => updatedState[key] = value);
        setState(updatedState);
    };

    const formOrSpinner = state.loading
        ? <Spinner />
        : <form>
              <input className={styles.input} type="text" name="name" placeholder="Your name" />
              <input className={styles.input} type="email" name="email" placeholder="Your email" />
              <input className={styles.input} type="text" name="street" placeholder="Street" />
              <input className={styles.input} type="text" name="zipCode" placeholder="Zip code" />
              <input className={styles.input} type="text" name="city" placeholder="City" />
              <Button onClick={handleClick} type='ok'>ORDER</Button>
        </form>;

    return (
        <div className={styles.contactData}>
            <h4>Enter your Contact Data</h4>
            {formOrSpinner}
        </div>
    );
}

ContactData.propTypes = {
    ingredients: PropTypes.object.isRequired
}

export default ContactData;