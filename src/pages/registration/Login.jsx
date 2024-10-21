// Login.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      const q = query(
        collection(fireDB, "users"),
        where('uid', '==', userCredential.user.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        let userData;
        querySnapshot.forEach((doc) => userData = doc.data());
        localStorage.setItem("userData", JSON.stringify(userData)); // Store user data
        toast.success("Login Successful");

        // Navigate based on the role
        if (userData.work === "User") {
          navigate('/user-dashboard');
        } else if (userData.work === "Admin") {
          navigate('/admin-dashboard');
        }
      });

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center w-auto my-20'>
        <div className="login_Form bg-slate-100 px-1 lg:px-8 py-6 border border-slate-400 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className='text-center text-2xl font-bold text-slate-600'>Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email Address'
                {...register('email', { required: "Email is required" })}
                className='bg-slate-100 border border-slate-400 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-250'
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder='Password'
                {...register('password', { required: "Password is required" })}
                className='bg-slate-100 border border-slate-400 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-250'
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-slate-600">Show Password</label>
              </div>
            </div>

            {/* Login Button */}
            <div className="mb-5">
              <button
                type='submit'
                className={`bg-slate-500 hover:bg-slate-600 w-full text-white text-center py-2 font-bold rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Redirect to Signup */}
          <div>
            <h2 className='text-black'>
              Don't have an account?{" "}
              <Link className='text-slate-500 font-bold' to={'/register'}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
