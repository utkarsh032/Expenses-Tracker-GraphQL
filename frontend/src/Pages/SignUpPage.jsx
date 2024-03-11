import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import RadioButton from "../components/ui/RadioButton";

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations/UserMutation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex rounded-lg overflow-hidden z-50  bg-gray-300'>
        <div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
          <div className='max-w-md w-full p-6'>
            <h1 className='md:text-4xl p-4 text-2xl lg:text-4xl font-bold text-center  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400  text-transparent bg-clip-text'>Sign Up</h1>
            <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
              Join to keep track of your expenses
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <Input
                label='Full Name'
                id='name'
                name='name'
                value={signUpData.name}
                onChange={handleChange}
              />
              <Input
                label='Username'
                id='username'
                name='username'
                value={signUpData.username}
                onChange={handleChange}
              />

              <Input
                label='Password'
                id='password'
                name='password'
                type='password'
                value={signUpData.password}
                onChange={handleChange}
              />
              <div className='flex gap-10'>
                <RadioButton
                  id='male'
                  label='Male'
                  name='gender'
                  value='male'
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id='female'
                  label='Female'
                  name='gender'
                  value='female'
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>

              <div>
                <button
                  type='submit'
                  className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
              from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className='mt-4 text-sm text-gray-600 text-center'>
              <p>
                Already have an account?{" "}
                <Link to='/login' className='text-black hover:underline'>
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;