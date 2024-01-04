import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { GoogleOAuthProvider } from '@react-oauth/google';

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const App = () => {
    const user: string | null = localStorage.getItem("token");
    const clientId: string | any = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Router>
                <Routes>
                    {user ? (
                        <>
                            <Route path="*" element={<Dashboard />} />
                            <Route path="/signup" element={<Navigate to="/" />} />
                            <Route path="/login" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                        </>
                    )}
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
