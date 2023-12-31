import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/userActions';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();


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

                dispatch(setUser(response.data));
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [dispatch]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard Page</h1>
            <p>Welcome to the Dashboard page!</p>
        </div>
    );
};

export default Dashboard;
