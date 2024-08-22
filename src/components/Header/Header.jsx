import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { auth } from "../../firebase";
import Loader from "../Loader/Loader";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = () => {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logout Successfully!");
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else
    return (
      <header className="bg-[var(--theme)] text-[var(--white)] w-full font-medium text-lg leading-7 sticky top-0 left-0">
        <nav className="flex justify-between items-center max-w-screen-xl mx-auto py-3">
          {/* Logo */}

          <div>
            <p>Financely.</p>
          </div>

          {/* Links */}
          {user && (
            <div className="flex gap-6">
              {/* <Link to={"/dashboard"}>Dashboard</Link> */}

              <img
                className="rounded-full"
                src={userIcon}
                alt="Profile Picture"
                width={32}
              />
              {/* <img
              className="rounded-full"
              src="https://lh3.googleusercontent.com/a/ACg8ocIKKH6CWK4NVoAHT22NbogWCimW_YyYIp_4r887Vy2hjaQap-e17w=s96-c"
              alt=""
              width={"32"}
            /> */}

              <button onClick={logout} className="text-sm">
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
    );
};

export default Header;
