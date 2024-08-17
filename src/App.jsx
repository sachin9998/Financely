import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
      
    </Router>
  );
};

export default App;
