import React, { useState } from "react";
import "../css/Register.css";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import SweetAlert from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const navigate = useNavigate();

  const {register, handleSubmit, formState} = useForm();
  const { errors } = formState;

  const loginRoute = () => {
    navigate('/login');
  }

  const onSubmit = (data) => {
    axios.post("https://reactapisthree.onrender.com/users/userRegistration", data)
    .then((res) => {
      console.log(res)
      if(res.data.statusCode === 200) {
        SweetAlert.fire(
          "success",
          data.firstName + " " + "Registered Successfully",
          "success",
        )
        navigate('/login');
      } else {
        SweetAlert.fire(
          "failure",
          "Registeration failed",
          "error",
        )
      }
    })
    .catch((err) => {
      SweetAlert.fire(
        "error",
        "Server error",
        "error",
      )
    })
  };

  return (
    <div className="registerClass">
      <Navbar />
      <form className="inputFields" onSubmit={handleSubmit(onSubmit)}>
        <div className="formClass container">
          <div className="col">
            <label className="labelClass">FirstName</label>
            <span>:</span>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              onChange={(e) =>
                setFormValues({ ...formValues, firstName: e.target.value })
              }
              {...register("firstName",{
                required: "FirstName is required",
              })}
            />
          </div>
          <p className="errorClass">{errors && errors.firstName && errors.firstName.message}</p>
          <div className="col">
            <label className="labelClass">LastName</label>
            <span>:</span>
            <input type="text" className="form-control" placeholder="Last name" name="lastName"
              onChange={(e) =>
                setFormValues({ ...formValues, lastName: e.target.value })
              }
              {...register("lastName",{
                required: "LastName is required",
              })} />
          </div>
          <p className="errorClass">{errors && errors.lastName && errors.lastName.message}</p>
          <div className="col">
            <label className="labelClass">Email</label>
            <span>:</span>
            <input type="email" class="form-control" placeholder="Email" name="email"
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              {...register("email",{
                required: "Email is required",
              })} />
          </div>
          <p className="errorClass">{errors && errors.email && errors.email.message}</p>
          <div className="col">
            <label className="labelClass">Password</label>
            <span>:</span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              {...register("password",{
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password should be above 4 characters"
                },
                maxLength: {
                  value: 10,
                  message: "Password should not exceed 10 characters"
                }
              })}
            />
          </div>
          <p className="errorClass">{errors && errors.password && errors.password.message}</p>
          <div class="col">
            <label className="labelClass">ContactNumber</label>
            <span>:</span>
            <input
              type="number"
              className="form-control"
              placeholder="Contact Number"
              name="firstName"
              onChange={(e) =>
                setFormValues({ ...formValues, contactNumber: e.target.value })
              }
              {...register("contactNumber",{
                required: "ContactNumber is required",
              })}
            />
          </div>
          <p className="errorClass">{errors && errors.contactNumber && errors.contactNumber.message}</p>
          <button type="submit" className="btn">
            Submit
          </button>
          <hr />
          <div className="icons">
            <button className="buttonClass">
              <div className="icon">
                <i className="fa fa-google iconReal" aria-hidden="true"></i>
                <p className="iconText">Google</p>
              </div>
            </button>
            <button className="buttonClass">
              <div className="icon">
                <i className="fa fa-facebook iconReal" aria-hidden="true"></i>
                <p className="iconText">Facebook</p>
              </div>
            </button>
            <button className="buttonClass">
              <div className="icon">
                <i className="fa fa-instagram iconReal" aria-hidden="true"></i>
                <p className="iconText">Instagram</p>
              </div>
            </button>
            <button className="buttonLoginClass" onClick={loginRoute}>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
