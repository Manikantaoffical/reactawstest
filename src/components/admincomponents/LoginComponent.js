import React from "react";
import Navbar from "./Navbar";
import "../css/Login.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios';
import SweetAlert from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    axios.post("https://reactapisthree.onrender.com/users/userlogin", data)
    .then((res) => {
      console.log(res);
      if(res.data.statusCode === 200) {
        console.log(res.data.data)
        SweetAlert.fire(
          "success",
          res.data.data.firstName + " " + res.data.msg,
          "success"
        )
          navigate('/dashboard');
      } else {
        SweetAlert.fire(
          "Badrequest",
          "Invalid Request",
          "login failure"
        )
      }
    })
    .catch((err) => {
      SweetAlert.fire(
        err,
        "error",
        "error"
      )
    })
  };

  const registerRoute = () => {
    navigate('/');
  }

  return (
    <div className="loginClass">
      <Navbar />
      <form className="inputFields" onSubmit={handleSubmit(onSubmit)}>
        <div className="formClass container">
          <div class="col">
            <label className="labelClass">Email</label>
            <span>:</span>
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              {
                ...register("email",{
                  required: "Email Required"
                })
              }
            />
          </div>
          <p className="errorClass">{errors && errors.email && errors.email.message}</p>
          <div class="col">
            <label className="labelClass">Password</label>
            <span>:</span>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              {...register("password", {
                required: "Password Required",
              })}
            />
          </div>
          <p className="errorClass">{errors && errors.password && errors.password.message}</p>
          <button type="submit" class="btn">
            Login
          </button>
          <hr />
          <div className="icons">
            <button className="buttonClass">
              <div className="icon">
                <i class="fa fa-google iconReal" aria-hidden="true"></i>
                <p className="iconText">Google</p>
              </div>
            </button>
            <button className="buttonClass">
              <div className="icon">
                <i class="fa fa-facebook iconReal" aria-hidden="true"></i>
                <p className="iconText">Facebook</p>
              </div>
            </button>
            <button className="buttonClass">
              <div className="icon">
                <i class="fa fa-instagram iconReal" aria-hidden="true"></i>
                <p className="iconText">Instagram</p>
              </div>
            </button>
            <button className="buttonLoginClass" onClick={registerRoute}>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
