import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [successfullyLogin, setSuccessfullyLogin] = useState("");
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset state
    setLoginError("");
    setSuccessfullyLogin("");

    if (password.length < 6) {
      setLoginError(
        "Password must be at least 6 characters! Please enter a valid password and try again later!"
      );
      return;
    }

    // firebase user login authentication
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified) {
          setSuccessfullyLogin("Logged in successfully!");
        } else {
          alert("Please verify your email address first!");
        }
        // Redirect to home page
        //  window.location.href = '/';
      })
      .catch((error) => {
        setLoginError(error.message);
        // Reset password field
        e.target.password.value = "";
        e.target.email.value = "";
      });
  };

  // Forget password
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      alert("Please enter your email address.");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // send password reset email
    sendPasswordResetEmail(auth, email)
    .then(result => {
      console.log(result);
      alert("Password reset email sent successfully!");
    })
    .catch(error => {
      console.log(error.message);
      // alert("Failed to send password reset email");
    })
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          {successfullyLogin && (
            <div className="text-green-600 text-center mt-6">
              {successfullyLogin}
            </div>
          )}
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="flex justify-center items-center relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  className="w-full input input-bordered"
                  required
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 cursor-pointer"
                >
                  {showPass ? (
                    <IoEyeOutline className="text-xl" />
                  ) : (
                    <IoEyeOffOutline className="text-xl" />
                  )}
                </span>
              </div>

              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center mb-6">
            <p>
              New to this website? Please{" "}
              <Link to="/heroRegister" className="link link-hover">
                Register
              </Link>
            </p>
          </div>
          {loginError && (
            <div className="text-red-600 text-center mt-6">{loginError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
