import React from "react";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
const SignInForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="max-w-md w-full">
      <Logo className="mx-auto" />
      <h2 className="text-3xl text-center font-bold leading-9">
        Sign into your account
      </h2>
      <p className="text-center mt-2 text-sm text-gray-600">
        or click
        <Link
          to="/auth/signup"
          className="text-blue-600 font-medium underline mx-1"
        >
          here
        </Link>
        to create one!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className=" m-4 text-center">
        <input
          className="shadow appearance-none border rounded w-3/4  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email Address"
          name="email"
          ref={register({ required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-600 m-2">{errors.email.message}</p>
        )}
        <input
          className="shadow appearance-none rounded w-3/4  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-600 m-2">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          className="m-auto rounded justify-center w-3/4 p-3  text-xs md:text-base bg-blue-600  hover:bg-blue-700"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
