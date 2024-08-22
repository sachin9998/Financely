// import { useState } from "react";
// import "./SignupSignIn.css";

// const SignupSingIn = () => {
//   const [flag, setFlag] = useState(false);

//   return (
//     <div className="wrapper">
//       {flag ? (
//         <div className="signup-container">
//           <h2 className="title">
//             Login on <span className="blue-text">Financely.</span>
//           </h2>

//           <form action="">
//             <div className="wrap-input">
//               <p>Email</p>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="johndoe@gmail.com"
//               />
//             </div>

//             <div className="wrap-input">
//               <p>Password</p>
//               <input type="password" name="name" placeholder="Your Password" />
//             </div>

//             <button className="btn">Login With Email and Password</button>
//           </form>

//           <p className="or">Or</p>

//           <button className="btn btn-secondary">Signup With Google</button>

//           <div>
//             <p style={{ textAlign: "center" }}>
//               Or Dont Have An Account Already?{" "}
//               <span className="blue-text">Click Here</span>
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="signup-container">
//           <h2 className="title">
//             Sign Up on <span className="blue-text">Financely.</span>
//           </h2>

//           <form action="">
//             <div className="wrap-input">
//               <p>Full Name</p>
//               <input type="text" name="name" placeholder="John Doe" />
//             </div>

//             <div className="wrap-input">
//               <p>Email</p>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="johndoe@gmail.com"
//               />
//             </div>

//             <div className="wrap-input">
//               <p>Password</p>
//               <input type="password" name="name" placeholder="Your Password" />
//             </div>

//             <div className="wrap-input">
//               <p>Confirm Password</p>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//               />
//             </div>

//             <button className="btn">Signup With Email and Password</button>
//           </form>

//           <p className="or">Or</p>

//           <button className="btn btn-secondary">Signup With Google</button>

//           <div>
//             <p style={{ textAlign: "center" }}>
//               Or Have An Account Already?{" "}
//               <span className="blue-text">Click Here</span>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupSingIn;
