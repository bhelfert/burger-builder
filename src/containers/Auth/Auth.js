import axios from '../../axios-auth';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Spinner from '../../components/ui/Spinner/Spinner';
import styles from './Auth.module.css';

const Auth = props => {
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState({
        expiresIn: null, // seconds
        idToken: null
    });

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = event => {
        const name = event.target.getAttribute('name');
        const value = event.target.value;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSignIn = () => handleSubmit('signInWithPassword');

    const handleSignUp = () => handleSubmit('signUp');

    const handleSubmit = firebaseAccountAction => {
        const authenticate = async (firebaseAccountAction) => {
            const setTokenThatExpires = result => {
                setToken({
                    expiresIn: result.data.expiresIn,
                    idToken: result.data.idToken
                });
                setTimeout(() => {
                    setToken(prevToken => ({
                        ...prevToken,
                        idToken: null
                    }));
                }, result.data.expiresIn * 1000);
                props.onTokenChange(result.data.idToken);
            };

            const getErrorMessage = error => {
                let errorMessage = error.message; // from axios
                if (error.response) {
                    errorMessage += ': ' + error.response.data.error.message; // from Firebase Auth
                }
                return errorMessage;
            };

            try {
                const authData = {
                    ...user,
                    returnSecureToken: true
                };
                setError(null);
                setLoading(true);
                const result = await axios.post(':' + firebaseAccountAction, authData);
                setLoading(false);
                console.info('posted auth data:', authData, ' -- result:', result);
                setTokenThatExpires(result);
            } catch (error) {
                setLoading(false);
                setError(getErrorMessage(error));
            }
        };
        authenticate(firebaseAccountAction);
    };

    let formOrSpinner = loading
        ? <Spinner />
        : <form>
              <Input
                  label='Email Address'
                  type='email'
                  name='email'
                  value={user.email}
                  placeholder='Please enter your email address'
                  onChange={handleInputChange}
                  required/>
              <Input
                  label='Password'
                  type='password'
                  name='password'
                  value={user.password}
                  placeholder='Please enter your password'
                  onChange={handleInputChange}
                  required
                  minLength='6'/>
              <Button type='ok' onClick={handleSignIn}>Sign In</Button>
              <Button type='cancel' onClick={handleSignUp}>Sign Up</Button>
          </form>;

    return (
        <div className={styles.auth}>
            {error && <p>{error}</p>}
            {formOrSpinner}
        </div>
    );
};

Auth.propTypes = {
    onTokenChange: PropTypes.func.isRequired
};

export default Auth;