import { useState } from 'react';
import './Navbar.scss';
import Dropdown from './Dropdown';
import logo from "../../assets/logo.png"

interface DropdownProps {
    handleLogout: () => void
}

const Navbar: React.FC<DropdownProps> = (props) => {
    const { handleLogout } = props
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="logo" />
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
