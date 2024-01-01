import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions';
import axios from 'axios';

const Dashboard: React.FC = (props: any) => {
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

    const role = props.user.role;
    return (
        <div className="dashboard-container">
            <h1>Dashboard Page</h1>
            <p>Welcome to the Dashboard page!</p>
            {role === "admin" && <p>This is admin-related content</p>}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
