import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { auth, db, provider } from "../firebase";

const getErrorMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use. Please try logging in.";
    case "auth/invalid-email":
      return "The email address is invalid. Please check and try again.";
    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";
    case "auth/user-not-found":
      return "The user does not exist. Please check the email or sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "The credentials provided are invalid.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

const Signup = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginWithEmail = (event) => {
    event.preventDefault();
    setLoading(true);

    if (email === "" || password === "") {
      toast.error("All fields are mandatory");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password Should be at least 6 Characters");
      setLoading(false);
      return;
    }

    toast.promise(
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User Logged in", user);
          navigate("/dashboard");
        }
      ),
      {
        loading: "Logging In...",
        success: <b>Logged In Successfully!</b>,
        error: (error) => {
          console.error("Firebase Error:", error);
          setLoading(false);
          return <b>{getErrorMessage(error)}</b>;
        },
      }
    );

    setLoading(false);
  };

  const signupWithEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    // Authenticate the user or Create new user
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password.length < 6) {
        toast.error("Password Should be at least 6 Characters");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Your password and confirmation password do not match.");
        setLoading(false);
        return;
      }

      toast.promise(
        createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            createUserDocument(user);

            console.log("User ::", user);
            setLoading(false);
            setName("");
            setPassword("");
            setConfirmPassword("");
            setLoginForm(true);
            navigate("/dashboard");
            // toast.success("Document Created");
          }
        ),
        {
          loading: "Creating User...",
          success: <b>Successfully Signed Up!</b>,
          error: (error) => {
            setLoading(false);
            return <b>{getErrorMessage(error)}</b>;
          },
        }
      );
    } else {
      setLoading(false);
      toast.error("All Fields are Mandatory");
    }
  };

  const createUserDocument = async (user) => {
    setLoading(true);

    // Make sure doc with userid does not exist
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });

        // toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.log("Error Creating user Document", error);
        setLoading(false);
      }
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("Logged In Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;

      setLoading(false);
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center">
      <div className="px-4 sm:p-0 bg-[var(--theme)] text-[var(--white)] font-medium text-lg leading-7 w-full absolute top-0 left-0 z-50">
        <Header />
      </div>
      {/* <div className="h-[calc(100vh-150px)] sm:h-[calc(100vh-100px)] flex items-center justify-center font-normal"> */}
      {/* <div className="h-[90vh] flex items-center justify-center "> */}
      {loginForm ? (
        <div className="min-w-[325px] sm:min-w-[400px] w-[30vw] box-shadow bg-white p-5 sm:p-8 rounded-md">
          <h2 className=" font-medium text-xl text-center">
            Log In on <span className="text-[var(--theme)]">Financely.</span>
          </h2>

          <div className="text-sm sm:text-base flex flex-col gap-4 mt-3">
            <div>
              <p>Email</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="">
              <p>Password</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                type="password"
                name="name"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={loginWithEmail}
              className="bg-white text-[var(--theme)] py-[6px] rounded border border-[var(--theme)] hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all flex justify-center items-center gap-2"
            >
              <MdMailOutline />
              {loading ? "Logging In..." : "Login With Email"}
            </button>
          </div>

          <p className="text-center my-2 text-sm">Or</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={signInWithGoogle}
              className="text-sm sm:text-base font-medium sm:font-normal bg-[var(--theme)] text-white py-[6px] border rounded hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all flex justify-center items-center gap-2"
            >
              <FaGoogle className="text-sm" />
              {loading ? "Loading..." : "Login With Google"}
            </button>

            <p className="text-xs sm:text-base text-center">
              Or Dont Have An Account?
              <span
                onClick={() => setLoginForm(false)}
                className="text-[var(--theme)]"
              >
                {" "}
                Click Here
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="min-w-[325px] sm:min-w-[400px] w-[30vw] box-shadow bg-white p-5 sm:p-8 rounded-md">
          <h2 className=" font-medium text-lg sm:text-xl text-center">
            Sign Up on <span className="text-[var(--theme)]">Financely.</span>
          </h2>

          <div
            className="text-sm sm:text-base flex flex-col gap-4 mt-3 "
            action=""
          >
            <div>
              <p>Full Name</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <p>Email</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div>
              <p>Password</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                type="password"
                name="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
              />
            </div>

            <div>
              <p>Confirm Password</p>
              <input
                className="outline-none py-1 border-b w-full border-gray-300"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>

            <button
              onClick={signupWithEmail}
              className="font-medium sm:font-normal bg-white text-[var(--theme)] py-[6px] rounded border border-[var(--theme)] hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all flex justify-center items-center gap-2 "
              disabled={loading}
            >
              <MdMailOutline />{" "}
              {loading ? "Creating User..." : "Signup Using Email"}
            </button>
          </div>

          <p className="text-center my-2 text-sm">Or</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={signInWithGoogle}
              className=" text-sm sm:text-base font-medium sm:font-normal bg-[var(--theme)] text-white py-[6px] border rounded hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all flex justify-center items-center gap-2"
            >
              <FaGoogle className="text-sm" />
              {loading ? "Loading..." : "Signup With Google"}
            </button>

            <p className="text-xs sm:text-base text-center">
              Or Have An Account Already?{" "}
              <span
                onClick={() => setLoginForm(true)}
                className="text-[var(--theme)]"
              >
                Click Here
              </span>
            </p>
          </div>
        </div>
      )}
      {/* </div> */}
      {/* </div> */}
      <div className=" text-sm fixed right- bottom-0 w-full sm:text-base sm:w-full bg-[var(--theme)] text-white p-3 flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
