import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Dropdown from './Dropdown';
import logo from "../../assets/logo.png"
import './Navbar.scss';

interface NavbarProps {
    handleLogout: () => void,
    isOpen: boolean
}

const Navbar: React.FC<NavbarProps> = (props) => {
    const { handleLogout, isOpen } = props
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.6,
            },
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <div className="navbar">
            <div className="logo">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.h1
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            <img src={logo} alt="Rentify" />
                        </motion.h1>
                    )}
                </AnimatePresence>
            </div>
            <div className="user">
                <div className="user-email">
                    keshavvyas484
                </div>
                <div className="user-photo" onClick={handleDropdownToggle}>
                    <img src={logo} alt="Profile" className="profile-photo" />
                    <div className="dropdown-menu">
                        <Dropdown isOpen={isDropdownOpen} onClose={() => setDropdownOpen(false)}>
                            <ul>
                                <li>Option 1</li>
                                <li>Option 2</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
