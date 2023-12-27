import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../ContextApi/ContextProvider";

const Login = () => {
  const {user} = useContext(authContext)

  const navigate = useNavigate();
  const location = useLocation();
  if(user){
    navigate("/")
    
  }
  const from = location?.state?.from?.pathname || "/";
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((res) => {
        const token = res.token;
        localStorage.setItem("token", token);
        navigate(from, { replace: true });
      })
    );
  };
  return (
    <div className="w-full">
      <div className="hero min-h-screen bg-base-200 w-4/5 mx-auto">
        <div className="hero-content w-2/5 flex flex-col lg:flex-row-reverse justify-center items-center">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <h1 className="text-2xl text-center my-5">Login Now</h1> <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
                <label className="label">
                  <Link className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
                <label className="label">
                  <Link to="/signup" className="label-text-alt link link-hover">
                    You dont have any account please signup
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
