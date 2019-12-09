import Modal from "../../components/Modal/Modal";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const AxiosErrorHandler = props => {
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    const requestInterceptor = props.axios.interceptors.request.use(request => {
        clearError();
        return request;
    });

    const responseInterceptor = props.axios.interceptors.response.use(response => response, err => {
        setError(err);
        return Promise.reject(err);
    });

    useEffect(() => () => {
        props.axios.interceptors.request.eject(requestInterceptor);
        props.axios.interceptors.response.eject(responseInterceptor);
    }, [props.axios.interceptors.request, requestInterceptor, props.axios.interceptors.response, responseInterceptor]);

    return (
        <>
            <Modal show={error ? true : false} onModalClosed={clearError}>
                {error ? error.message : null}
            </Modal>
            {props.children}
        </>
    );
};

AxiosErrorHandler.propTypes = {
    axios: PropTypes.func.isRequired
};

export default AxiosErrorHandler;