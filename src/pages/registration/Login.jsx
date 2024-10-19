import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Layout from "../../components/layout/Layout";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Submit handler
  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <Layout>
      <div className='flex justify-center items-center w-auto my-20'>
        {/* Login Form */}
        <div className="login_Form bg-slate-100 px-1 lg:px-8 py-6 border border-slate-400 rounded-xl shadow-md">

          {/* Top Heading */}
          <div className="mb-5">
            <h2 className='text-center text-2xl font-bold text-slate-600'>
              Login
            </h2>
          </div>

          {/* Form with react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email Address'
                {...register('email', { required: "Email is required" })}
                className='bg-slate-100 border border-slate-400 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-250'
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <input
                type="password"
                placeholder='Password'
                {...register('password', { required: "Password is required" })}
                className='bg-slate-100 border border-slate-400 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-250'
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <div className="mb-5">
              <button
                type='submit'
                className='bg-slate-500 hover:bg-slate-600 w-full text-white text-center py-2 font-bold rounded-md'
              >
                Login
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
