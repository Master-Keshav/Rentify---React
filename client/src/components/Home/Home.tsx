import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import axios from "axios";

import { setUser } from '../../actions/userActions';
import Agent from '../../pages/Agent';
import AgentsList from '../../pages/AgentsList'
import CreateProperty from '../../pages/CreateProperty';
import Dashboard from '../../pages/Dashboard';
import LogoutModal from "../LogoutModal/LogoutModal";
import LoaderModal from "../LoaderModal/LoaderModal";
import Navbar from '../Navbar/Navbar';
import Properties from '../../pages/Properties';
import PropertyDetails from "../../pages/PropertyDetails";
import SideBar from '../SideBar/Sidebar';
import './index.css';

const Home: React.FC = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;

    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const url = `${host}/api/user`;
                const response = await axios.get(url, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                props.setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };

    const userId = props.user._id

    return (
        <>
            <div className="main-container">
                <div className="sidebar-container">
                    <SideBar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        userId={userId}
                        setShowLogoutModal={setShowLogoutModal}
                    />
                </div>
                <div className="page-container">
                    <div>
                        <Navbar
                            handleLogout={handleLogout}
                            isOpen={isOpen}
                            setShowLogoutModal={setShowLogoutModal}
                        />
                    </div>
                    <div className="page">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/properties" element={<Properties user={userId} setIsLoading={setIsLoading} />} />
                            <Route path="/properties/create" element={<CreateProperty user={userId} setIsLoading={setIsLoading} />} />
                            <Route path="/properties/:id" element={<PropertyDetails setIsLoading={setIsLoading} />} />
                            <Route path="/agents" element={<AgentsList setIsLoading={setIsLoading} />} />
                            <Route path="/agent/:id" element={<Agent setIsLoading={setIsLoading} />} />
                            <Route path={`/user/:id`} element={<Agent setIsLoading={setIsLoading} />} />
                        </Routes>
                    </div>
                </div>
            </div>
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                handleLogout={handleLogout}
            />
            <LoaderModal isOpen={isLoading} />
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: any) => dispatch(setUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
