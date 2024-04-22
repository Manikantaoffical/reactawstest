import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductGrid from "./productGrid";
import UserList from "./usersComponent";

function DashBoardComponent() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [userId, setUserId] = useState('userId');
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  })

  
  const getUsers = () => {
    axios
      .get("https://reactapisthree.onrender.com/users/getUsersList")
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data.data);
        // console.log(setUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    axios
      .get("https://reactapisthree.onrender.com/products/getproducts")
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserById = (data) => {
    setUserId(data.userId)
    axios
      .post("https://reactapisthree.onrender.com/users/getUserById", userId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logoutUser = () => {
    navigate("/login");
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "users") {
      getUsers();
    } else if (tab === "products") {
      getProducts();
    }
  };

  return (
    <div className="dashboardClass">
      <div className="navbar">
        <Navbar />
        <div className="routes">
          <button className="buttons" onClick={() => handleTabClick("users")}>
            Users
          </button>
          <button
            className="buttons"
            onClick={() => handleTabClick("products")}
          >
            Products
          </button>
          <button className="buttons" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="sidebar d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <h1>User Profile</h1>
              <p>FirstName: <span>{}</span></p>
            </div>
          </div>
          <div class="col py-3 scrollingClass">
            {activeTab === "users" ? (
              <UserList users={users} />
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardComponent;
