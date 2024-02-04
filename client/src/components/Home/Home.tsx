import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import axios from "axios";

import { setUser } from '../../actions/userActions';
import Agent from '../../pages/Agent';
import AgentsList from '../../pages/AgentsList'
import CreateProperty from '../../pages/CreateProperty';
import Dashboard from '../../pages/Dashboard';
import Messages from '../../pages/Messages';
import Navbar from '../Navbar/Navbar';
import Properties from '../../pages/Properties';
import PropertyDetails from "../../pages/PropertyDetails";
import SideBar from '../SideBar/Sidebar';
import './index.css';

const Home: React.FC = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const url = `${host}/api/user`;
                const response = await axios.get(url, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                props.setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

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
                            <Route path="/properties" element={<Properties user={userId} />} />
                            <Route path="/properties/create" element={<CreateProperty user={userId} />} />
                            <Route path="/properties/:id" element={<PropertyDetails />} />
                            <Route path="/agents" element={<AgentsList />} />
                            <Route path="/agent/:id" element={<Agent />} />
                            <Route path={`/user/:id`} element={<Agent />} />
                            <Route path="/messages" element={<Messages />} />
                        </Routes>
                    </div>
                </div>
            </div>
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
