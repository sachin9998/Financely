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
    <header className="px-4 sm:p-0 bg-[var(--theme)] text-[var(--white)] font-medium text-lg leading-7 w-full fixed top-0 left-0 z-50">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto py-3">
        {/* Logo */}

        <div>
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
