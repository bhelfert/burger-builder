import axios from '../../../axios-orders';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Spinner from '../../../components/ui/Spinner/Spinner';
import styles from './ContactData.module.css';
import { useHistory } from 'react-router-dom';

const ContactData = props => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        street: '',
        zipCode: '',
        city: ''
    });

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleInputChange = event => {
        const name = event.target.getAttribute('name');
        const value = event.target.value;
        setContactData(prevContactData => ({
            ...prevContactData,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        const postOrder = async () => {
            setLoading(true);
            try {
                const order = {
                    contactData: contactData,
                    ingredients: props.ingredients,
                    price: props.price
                };
                const result = await axios.post('/orders.json', order);
                setLoading(false);
                console.info('posted order:', order, ' -- result:', result);
                history.push('/');
            }
            catch (error) {
                console.error('could not post order:', error.message);
                setLoading(false);
            }
        };
        postOrder();
    };

    const formOrSpinner = loading
        ? <Spinner />
        : <form onSubmit={handleSubmit}>
              <Input label='Name'     type='text'  name='name'    value={contactData.name}    placeholder='Your name'     onChange={handleInputChange} required />
              <Input label='Email'    type='email' name='email'   value={contactData.email}   placeholder='Your email'    onChange={handleInputChange} required />
              <Input label='Street'   type='text'  name='street'  value={contactData.street}  placeholder='Your street'   onChange={handleInputChange} required />
              <Input label='Zip code' type='text'  name='zipCode' value={contactData.zipCode} placeholder='Your zip code' onChange={handleInputChange} required minLength='4' maxLength='5' />
              <Input label='City'     type='text'  name='city'    value={contactData.city}    placeholder='Your city'     onChange={handleInputChange} required />
              <Button type='ok'>ORDER</Button>
        </form>;

    return (
        <div className={styles.contactData}>
            <h4>Enter your Contact Data</h4>
            {formOrSpinner}
        </div>
    );
};

ContactData.propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired
};

export default ContactData;