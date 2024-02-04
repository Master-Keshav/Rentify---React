import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { AnimatePresence, motion } from 'framer-motion';

import Dropdown from './Dropdown';
import logo from "../../assets/logo.png"
import './Navbar.scss';

interface NavbarProps {
    handleLogout: () => void,
    isOpen: boolean,
    user: any,
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
    const { setShowLogoutModal, isOpen } = props
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

    const user = props.user
    return (
        <div className="navbar">
            <Link to='/'>
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
            </Link>
            <div className="user">
                <div className="user-email">
                    {user.firstName} {user.lastName}
                </div>
                <div className="user-photo" onClick={handleDropdownToggle}>
                    <img src={user.avatar} alt="Profile" className="profile-photo" />
                    <div className="dropdown-menu">
                        <Dropdown isOpen={isDropdownOpen} onClose={() => setDropdownOpen(false)}>
                            <ul>
                                <li>Option 1</li>
                                <li>Option 2</li>
                                <li onClick={() => setShowLogoutModal(true)}>Logout</li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps)(Navbar);
