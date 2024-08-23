import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { auth } from "../../firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const profilePictureURL = user?.photoURL;

  const logout = () => {
    auth.signOut();
    toast.success("Logged out Successfully!");
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <header className="bg-[var(--theme)] text-[var(--white)] w-full font-medium text-lg leading-7 sticky top-0 left-0">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto py-3">
        {/* Logo */}

        <div>
          <p>Financely.</p>

          {/* <img
            className="rounded-full"
            src={profilePictureURL || userIcon}
            alt="Profile Picture"
            width={32}

          /> */}
        </div>

        {/* Links */}
        {user && (
          <div className="flex gap-6">
            {/* <Link to={"/dashboard"}>Dashboard</Link> */}

            <img
              className="rounded-full"
              src={profilePictureURL || userIcon}
              alt="Profile Picture"
              width={32}
            />

            <button onClick={logout} className="text-sm">
              Logout
            </button>
          </div>
        )}

        {/* {user ? (
          <p className="navbar-link" onClick={logout}>
            <span style={{ marginRight: "1rem" }}>
              <img
                src={user.photoURL ? user.photoURL : userSvg}
                width={user.photoURL ? "32" : "24"}
                style={{ borderRadius: "50%" }}
              />
            </span>
            Logout
          </p>
        ) : (
          <></>
        )} */}
      </nav>
    </header>
  );
};

export default Header;
