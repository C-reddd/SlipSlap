import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

const SignUpForm = () => {
  const { register, errors, handleSubmit, getValues } = useForm();

  const onSubmit = (data: Record<string, string>) => {

  };
  return (
    <div className=" w-full mt-6">
      <h2 className="text-3xl text-center font-bold leading-9">
        Sign up for Slip<span className="text-blue-600">Slap</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" m-4 text-center">
        <div className="block md:flex md:space-x-2">
          <div className="w-full md:w-1/2">
            <input
              className="shadow appearance-none border rounded w-full m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="First Name"
              name="firstName"
              ref={register({ required: "First Name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-600 m-2">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <input
              className="shadow appearance-none border rounded w-full m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Last Name"
              name="lastName"
              ref={register({ required: "Last Name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-600 m-2">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <input
          className="shadow appearance-none border rounded w-full m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email Address"
          name="email"
          ref={register({ required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-600 m-2">{errors.email.message}</p>
        )}
        <input
          className="shadow appearance-none rounded w-full m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-600 m-2">{errors.password.message}</p>
        )}
        <input
          className="shadow appearance-none rounded w-full  m-2 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Verify Password"
          name="passwordVerify"
          ref={register({
            required: "You must specify a password",
            validate: value => {
              if (value === getValues()["password"]) {
                return true;
              } else {
                return "The passwords do not match";
              }
            },
          })}
        />
        {errors.passwordVerify && (
          <p className="text-red-600 m-2">{errors.passwordVerify.message}</p>
        )}
        <Button
          type="submit"
          className="m-auto rounded justify-center w-3/4 p-3  text-xs md:text-base bg-blue-600  hover:bg-blue-700"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
