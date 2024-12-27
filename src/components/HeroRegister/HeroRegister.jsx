import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [successfullyRegistered, setSuccessfullyRegistered] = useState('');
    const [showPass, setShowPass] = useState(false);

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/;

    const handleHeroRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        // reset state
        setRegisterError('');
        setSuccessfullyRegistered('');

        if(password.length < 6) {
            setRegisterError('Password must be at least 6 characters! Please enter a valid password and try again later!');
            return;
        }else if(!passwordRegex.test(password)) {
            setRegisterError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!');
            return;
        }else if(!accepted) {
            setRegisterError('You must accept the terms and conditions!');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            // console.log(result.user);
            setSuccessfullyRegistered('User signed in successfully!');

            // Update User Profile
            updateProfile(result.user, {
              displayName: name,
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() => {
              console.log("User Profile updated successfully");
            })
            .catch(error => {
              console.error("Error updating user profile: ", error);
            })

            // Send user verification email
            sendEmailVerification(result.user)
            .then(() => {
              alert("Please check your email and verify your account!");
            })
        })
        .catch(error => {
            setRegisterError(error.message);
        })
    }

  return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            {
                successfullyRegistered && (
                  <div className="text-green-600 text-center mt-6">
                    {successfullyRegistered}
                  </div>
                )
            }
            <form onSubmit={handleHeroRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                name="email"
                  type="email"
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
                type={showPass? "text" : "password"}
                  placeholder="password"
                  className="w-full input input-bordered"
                  required
                />
                <span onClick={() => setShowPass(!showPass)}  className="absolute right-2 cursor-pointer">{showPass ? <IoEyeOutline className="text-xl"/> : <IoEyeOffOutline className="text-xl"/>}</span>
                </div>

                <div className="mt-2">
                    <input type="checkbox" name="terms" />
                    <label className="ml-2" htmlFor="terms">Accept out <a href="">Terms and Conditions</a></label>
                </div>
                
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <div className="text-center mb-6">
              <p>Already have an account? <Link to="/login" className="link link-hover">Login</Link></p>
            </div>

            {
                registerError && (
                  <div className="text-red-600 text-center mt-6">
                    {registerError}
                  </div>
                )
            }
          </div>
        </div>
      </div>
  );
};

export default HeroRegister;
