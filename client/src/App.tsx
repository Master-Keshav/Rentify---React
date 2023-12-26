import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const user: string | null = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {user && <Route path="/" element={<Dashboard />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
