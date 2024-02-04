import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.scss';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, handleLogout }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, handleLogout]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="logout-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="logout-content">
                        <p>Are you sure you want to log out?</p>
                        <div className="buttons">
                            <button onClick={handleLogout}>Yes</button>
                            <button onClick={onClose}>No</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LogoutModal;