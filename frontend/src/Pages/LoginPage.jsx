import { Link } from "react-router-dom";
import { useState } from "react";
import Input from "../components/ui/Input";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
        <div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
          <div className='max-w-md w-full p-6'>
            <h1 className='md:text-4xl p-4 text-2xl lg:text-4xl font-bold text-center  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400  text-transparent bg-clip-text'>Login</h1>
            <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
              Welcome back! Log in to your account
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <Input
                label='Username'
                id='username'
                name='username'
                value={loginData.username}
                onChange={handleChange}
              />

              <Input
                label='Password'
                id='password'
                name='password'
                type='password'
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type='submit'
                  className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
                  from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
                >
                  Login
                </button>
              </div>
            </form>
            <div className='mt-4 text-sm text-gray-600 text-center'>
              <p>
                {"Don't"} have an account?{" "}
                <Link to='/signup' className='text-black hover:underline'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};
export default LoginPage;