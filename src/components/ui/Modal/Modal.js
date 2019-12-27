import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Modal.module.css';

const Modal = props =>
    <>
        <Backdrop isShown={props.isShown} onClick={props.onModalClosed}/>
        <div
            className={styles.modal}
            style={{
                transform: props.isShown ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.isShown ? "1" : "0"
            }}>
            {props.children}
        </div>
    </>;

const areEqual = (prevProps, nextProps) => (nextProps.show === prevProps.show) && (nextProps.children === prevProps.children);

Modal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    onModalClosed: PropTypes.func.isRequired
};

export default React.memo(Modal, areEqual);