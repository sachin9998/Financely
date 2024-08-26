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
    <header >
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto py-3 px-4">
        {/* Logo */}
        <div className="">
          <p>Financely.</p>
        </div>

        {/* Links */}
        {user && (
          <div className="flex gap-6">
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
      </nav>
    </header>
  );
};

export default Header;
