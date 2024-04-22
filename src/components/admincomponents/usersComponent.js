import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import SweetAlert from "sweetalert2";
import $ from "jquery";

const UserList = ({ users }) => {
  // console.log(users);
  const [userlist, setUser] = useState([users]);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  // const [editFormValues, setEditFormValues] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   contactNumber: ""
  // });
  const [userId, setUserId] = useState('userId');
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post("https://reactapisthree.onrender.com/users/userRegistration", data)
      .then((res) => {
        if (res.data.statusCode === 200) {
          SweetAlert.fire(
            "success",
            res.data.data.firstName + " " + res.data.msg,
            "success"
          );
          reset();
          $("#userAddModal").hide();
          $(".modal-backdrop").remove();
          getUsers();
        } else {
          SweetAlert.fire("failure", "error", "bad request");
        }
      })
      .catch((error) => {
        console.log(error);
        SweetAlert.fire("error", "server error", "error");
      });
  };

  const getUsers = () => {
    axios
      .get("https://reactapisthree.onrender.com/users/getUsersList")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  // const getUser = (data) => {
  //   console.log(data)
  //   setFormValues({
  //     ...formValues,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     password: data.password,
  //     contactNumber: data.contactNumber,
  //   });
  // }

  const editUser = (data) => {
    console.log(data)
    setFormValues({
      ...formValues,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
    });
    setUserId(data.userId);
  }

  const submitUser = () => {
    axios.post("https://reactapisthree.onrender.com/users/updateuser", {
      ...formValues,
      userId,
    })
    .then((res) => {
      console.log(res);
      SweetAlert.fire("success", "User Updated Successfully", "success");
      // reset();
      $("#userEditModal").hide();
      $(".modal-backdrop").remove();
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const deleteUser = (userId) => {
    axios
      .post("https://reactapisthree.onrender.com/users/deleteuser", { userId })
      .then((res) => {
        // console.log(res);
        if (res.data.statusCode === 200) {
          SweetAlert.fire("success", "Deleted Successfully", "success");
          getUsers();
        } else {
          SweetAlert.fire("failure", "User not deleted successfully", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        SweetAlert.fire("server error", "Server Error", "error");
      });
  };
  return (
    <div className="wholeClass">
      <div className="flexClass">
        <h1 className="headingClass">Users List</h1>
        <div
          className="addClass"
          data-toggle="modal"
          data-target="#userAddModal"
        >
          AddUser <span className="plusClass">+</span>
        </div>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="userAddModal"
          tabindex="-1"
          aria-labelledby="userAddModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="userAddModal">
                  Create User
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      name="firstName"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          firstName: e.target.value,
                        });
                      }}
                      {...register("firstName", {
                        required: "FirstName is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.firstName && errors.firstName.message}
                  </p>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      name="lastName"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          lastName: e.target.value,
                        });
                      }}
                      {...register("lastName", {
                        required: "LastName is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.lastName && errors.lastName.message}
                  </p>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          email: e.target.value,
                        });
                      }}
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.email && errors.email.message}
                  </p>
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          password: e.target.value,
                        });
                      }}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 4,
                          message:
                            "Password should be more than four characters",
                        },
                        maxLength: {
                          value: 10,
                          message: "Password should not exceed 10 characters",
                        },
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.password && errors.password.message}
                  </p>
                  <div class="col">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Contact Number"
                      name="contactNumber"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          contactNumber: e.target.value,
                        });
                      }}
                      {...register("contactNumber", {
                        required: "Contact Number is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors &&
                      errors.contactNumber &&
                      errors.contactNumber.message}
                  </p>
                  <button
                    type="button"
                    class="btn btn-secondary closeButton"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="tableClass container">
        <thead className="table-dark">
          <tr className="tableRow">
            <th className="tableHeader" scope="col">
              FirstName
            </th>
            <th className="tableHeader" scope="col">
              LastName
            </th>
            <th className="tableHeader" scope="col">
              Email
            </th>
            <th className="tableHeader" scope="col">
              Contact Number
            </th>
            <th className="tableHeader" scope="col">
              Operations
            </th>
          </tr>
        </thead>
        {userlist.map((user, index) => (
          <tbody className="tablebody">
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                <i
                  className="fa fa-eye oper"
                  aria-hidden="true"
                  data-toggle="modal"
                  data-target="#userViewModal"
                  onClick={(e) => {
                    e.preventDefault();
                    editUser(user);
                  }}
                ></i>
                {/* view User Modal */}
                <div
                  class="modal fade"
                  id="userViewModal"
                  tabindex="-1"
                  aria-labelledby="userViewModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="userViewModal">
                          View User
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="First name"
                              value={formValues.firstName}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Last name"
                              value={formValues.lastName}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Email"
                              value={formValues.email}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Password"
                              value={formValues.password}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Contact Number"
                              value={formValues.contactNumber}
                            />
                          </div>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <i
                  className="fa fa-pencil-square-o oper"
                  aria-hidden="true"
                  data-toggle="modal"
                  data-target="#userEditModal"
                  onClick={() => {
                    editUser(user);
                  }}
                ></i>
                <div
                  class="modal fade"
                  id="userEditModal"
                  tabindex="-1"
                  aria-labelledby="userEditModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="userViewModal">
                          Edit User
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form onSubmit={(e) => {e.preventDefault();submitUser();}}>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="First name"
                              value={formValues.firstName}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  firstName: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Last name"
                              value={formValues.lastName}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  lastName: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Email"
                              value={formValues.email}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  email: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Password"
                              value={formValues.password}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  password: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Contact Number"
                              value={formValues.contactNumber}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  contactNumber: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            class="btn btn-secondary closeButton"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <i
                  className="fa fa-trash oper"
                  aria-hidden="true"
                  onClick={() => {
                    deleteUser(user.userId);
                  }}
                ></i>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default UserList;
