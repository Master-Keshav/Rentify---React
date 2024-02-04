import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaUser } from 'react-icons/fa';
import { IoMdPeople } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbBuildingPavilion } from "react-icons/tb";

import logo from '../../assets/logo.png';
import './Sidebar.scss';

interface RouteItem {
    path: string;
    name: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string,
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SidebarProps> = (props) => {
    const { isOpen, setIsOpen, userId, setShowLogoutModal } = props;
    const toggle = () => setIsOpen(!isOpen);

    const routes: RouteItem[] = [
        {
            path: '/',
            name: 'Dashboard',
            icon: <LuLayoutDashboard />,
        },
        {
            path: '/properties',
            name: 'Properties',
            icon: <TbBuildingPavilion />,
        },
        {
            path: '/agents',
            name: 'Agents',
            icon: <IoMdPeople />,
        },
        {
            path: `/user/${userId}`,
            name: 'My Profile',
            icon: <FaUser />,
        },
    ];

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.6,
            },
        },
        show: {
            width: '140px',
            padding: '5px 15px',
            transition: {
                duration: 0.6,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <div className="sidebar">
            <div className="top-section">
                <div className="logo">
                    <AnimatePresence>
                        {isOpen && (
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
                <div className="bars">
                    <FaBars onClick={toggle} />
                </div>
            </div>

            <div className="search-section">
                <div className="search-icon">
                    <BiSearch onClick={!isOpen ? toggle : null} />
                </div>
                <div className="search-box">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.input
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                variants={inputAnimation}
                                type="text"
                                placeholder="Search Property"
                                className="search-box-input"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <section className="routes">
                {routes.map((route, index) => (
                    <NavLink
                        key={index}
                        to={route.path}
                        className="link"
                    >
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="text"
                                >
                                    {route.name}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </NavLink>
                ))}
                <div className="link" onClick={() => setShowLogoutModal(true)}>
                    <div className="icon">
                        <RiLogoutBoxLine />
                    </div>
                    {isOpen && <div className="text">Logout</div>}
                </div>
            </section>
        </div>
    );
};

export default SideBar;
