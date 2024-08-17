import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";

const Header = () => {
  const logout = () => {
    toast.success("Logout Successfully!");
  };

  return (
    <header>
      <nav className="nav">
        {/* Logo */}
        <div className="logo">
          <p>Financely.</p>
        </div>

        {/* Links */}
        <div className="nav-links">
          {/* <Link to={"/dashboard"}>Dashboard</Link> */}

          <img
            className="profile-pic"
            src="https://lh3.googleusercontent.com/a/ACg8ocIKKH6CWK4NVoAHT22NbogWCimW_YyYIp_4r887Vy2hjaQap-e17w=s96-c"
            alt=""
            width={"32"}
          />

          <p>Logout</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
