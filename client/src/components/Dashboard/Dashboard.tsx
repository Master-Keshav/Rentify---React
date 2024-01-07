import { Route, Routes } from 'react-router-dom';

import Agencies from '../../pages/Agencies'
import Messages from '../../pages/Messages';
import Navbar from '../Navbar/Navbar';
import Properties from '../../pages/Properties';
import Reviews from '../../pages/Reviews';
import SideBar from '../SideBar/Sidebar';
import User from '../../pages/User';
import './Dashboard.css';

const Dashboard = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };

    return (
        <>
            <div className="main-container">
                <div className="sidebar-container">
                    <SideBar />
                </div>
                <div className="page-container">
                    <div className="navbar">
                        <Navbar handleLogout={handleLogout} />
                    </div>
                    <div className="page">
                        <Routes>
                            <Route path="/" element={<Properties />} />
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

export default Dashboard;
