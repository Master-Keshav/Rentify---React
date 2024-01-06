import { Route, Routes } from 'react-router-dom';
import Agencies from '../../pages/Agencies'
import Messages from '../../pages/Messages';
import Properties from '../../pages/Properties';
import Reviews from '../../pages/Reviews';
import SideBar from '../SideBar/Sidebar';
import User from '../../pages/User';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <>
            <div className="main-container">
                <div className="sidebar-container">
                    <SideBar />
                </div>
                <div className="page-container">
                    <Routes>
                        <Route path="/" element={<Properties />} />
                        <Route path="/agencies" element={<Agencies />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/messages" element={<Messages />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
