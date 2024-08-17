import Header from "../components/Header/Header";
import SignupSingIn from "../components/SignupSignin/SignupSingin";

const Signup = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSingIn />
      </div>
    </div>
  );
};

export default Signup;
