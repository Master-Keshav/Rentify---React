import React, { ReactNode } from 'react';

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { isOpen, onClose, children } = props;
    return isOpen ? (
        <div className="dropdown-container" onClick={onClose}>
            {children}
        </div>
    ) : null;
};

export default Dropdown;
