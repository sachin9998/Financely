import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
