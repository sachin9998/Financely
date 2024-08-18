import toast from "react-hot-toast";
import { Link } from "react-router-dom";
toast

const Header = () => {
  const logout = () => {
    toast.success("Logout Successfully!");
  };

  return (
    <header className="bg-[var(--theme)] text-[var(--white)] w-full font-light text-lg leading-7 sticky top-0 left-0">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto py-3">
        {/* Logo */}

        <div className="logo">
          <p>Financely.</p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          {/* <Link to={"/dashboard"}>Dashboard</Link> */}

          <img
            className="rounded-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocIKKH6CWK4NVoAHT22NbogWCimW_YyYIp_4r887Vy2hjaQap-e17w=s96-c"
            alt=""
            width={"32"}
          />

          <button onClick={logout} className="text-sm">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
