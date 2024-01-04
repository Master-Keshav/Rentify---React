import { Route, Routes } from "react-router-dom";

import Home from '../../pages/Home';
import Messages from "../../pages/Messages";
import SideBar from '../SideBar/Sidebar';
import Users from "../../pages/Users";

import './Dashboard.css'

const Dashboard = () => {
    return (
        <>
            <SideBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/messages" element={<Messages />} />
                </Routes>
            </SideBar>
        </>
    );
};
export default Dashboard