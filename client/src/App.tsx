import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { GoogleOAuthProvider } from '@react-oauth/google';

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
    const user: string | null = localStorage.getItem("token");
    const clientId: string | any = import.meta.env.VITE_GOOGLE_CLIENT_ID

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Router>
                <Routes>
                    {user && <Route path="/" element={<Dashboard />} />}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
