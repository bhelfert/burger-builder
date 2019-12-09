import Backdrop from "../Backdrop/Backdrop";
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Modal.module.css';

const Modal = props =>
    <>
        <Backdrop show={props.show} onClick={props.onModalClosed}/>
        <div
            className={styles.modal}
            style={{
                transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.show ? "1" : "0"
            }}>
            {props.children}
        </div>
    </>;

const areEqual = (prevProps, nextProps) => (nextProps.show === prevProps.show) && (nextProps.children === prevProps.children);

Modal.propTypes = {
    onModalClosed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default React.memo(Modal, areEqual);