import React from 'react';
import { motion } from 'framer-motion';
import loader from '../../assets/loader.gif'
import './index.scss';

interface LoaderModalProps {
    isOpen: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ isOpen }) => {
    const loaderVariants = {
        hidden: {
            opacity: 0,
            display: 'none',
        },
        visible: {
            opacity: 1,
            display: 'block',
        },
    };

    return (
        <motion.div
            className="loader-modal"
            variants={loaderVariants}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
        >
            <div className="loader-content">
                <img src={loader} alt="Loading..." className="loader-gif" />
            </div>
        </motion.div>
    );
};

export default LoaderModal;
