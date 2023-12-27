import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../ContextApi/ContextProvider";

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const {user} = useContext(authContext)
  if(user){
    navigate("/")
    
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/auth/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((res) => {
          setError(res);
          if (res._id) {
            toast.success("User created succesfully");
            reset();
            setError("");
          }
          if (!error) {
            setInterval(() => {
              setError("");
            }, 10000);
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full">
      <div className="hero min-h-screen bg-base-200 w-4/5 mx-auto">
        <div className="hero-content w-2/5 flex flex-col lg:flex-row-reverse justify-center items-center">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <h1 className="text-2xl text-center my-5">Register Now</h1> <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "username cannot be empty",
                    },
                  })}
                />
                {errors?.username && (
                  <span className="label-text text-red-600 mt-1">
                    {errors?.username?.message}
                  </span>
                )}
                <span className="label-text text-red-600 mt-1">
                  {error?.username && error?.username}
                </span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email cannot be empty",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Please provide a valid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <span className="label-text text-red-600 mt-1">
                    {errors?.email?.message}
                  </span>
                )}
                <span className="label-text text-red-600 mt-1">
                  {error?.email && error?.email}
                </span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password cannot be empty",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must be min 5 charracter",
                    },
                  })}
                />
                {errors?.password && (
                  <span className="label-text text-red-600 mt-1">
                    {errors?.password?.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Password cannot be empty",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must be min 5 charracter",
                    },
                  })}
                />
                {errors?.confirmPassword && (
                  <span className="label-text text-red-600 mt-1">
                    {errors?.confirmPassword?.message}
                  </span>
                )}
                <span className="label-text text-red-600 mt-1">
                  {error?.confirmPassword && error?.confirmPassword}
                </span>
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Already have an account please login
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
