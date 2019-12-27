import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ onLogOut })  => {
    useEffect(() => {
       onLogOut();
    }, [onLogOut]);

    return <Redirect to='/' />;
};

Logout.propTypes = {
    onLogOut: PropTypes.func.isRequired
};

export default Logout;