import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Agencies from '../../pages/Agencies'
import Dashboard from '../../pages/Dashboard';
import Messages from '../../pages/Messages';
import Navbar from '../Navbar/Navbar';
import Properties from '../../pages/Properties';
import Reviews from '../../pages/Reviews';
import SideBar from '../SideBar/Sidebar';
import User from '../../pages/User';
import './Home.css';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };

    return (
        <>
            <div className="main-container">
                <div className="sidebar-container">
                    <SideBar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
                <div className="page-container">
                    <div>
                        <Navbar
                            handleLogout={handleLogout}
                            isOpen={isOpen}
                        />
                    </div>
                    <div className="page">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/properties" element={<Properties />} />
                            <Route path="/agencies" element={<Agencies />} />
                            <Route path="/reviews" element={<Reviews />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/messages" element={<Messages />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
