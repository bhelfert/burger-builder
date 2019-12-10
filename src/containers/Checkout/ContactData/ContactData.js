import Button from "../../../components/ui/Button/Button";
import React from 'react';
import styles from './ContactData.module.css';

const ContactData = () =>
    <div className={styles.contactData}>
        <h4>Enter your Contact Data</h4>
        <form>
            <input className={styles.input} type="text" name="name" placeholder="Your name" />
            <input className={styles.input} type="email" name="email" placeholder="Your email" />
            <input className={styles.input} type="text" name="street" placeholder="Street" />
            <input className={styles.input} type="text" name="zipCode" placeholder="Zip code" />
            <input className={styles.input} type="text" name="city" placeholder="City" />
            <Button onClick={null} type='ok'>ORDER</Button>
        </form>
    </div>;

export default ContactData;