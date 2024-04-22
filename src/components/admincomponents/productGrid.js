import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SweetAlert from "sweetalert2";
import $ from "jquery";

const ProductGrid = ({ products }) => {
  // console.log(products);
  const [productList, setProductList] = useState([products]);
  const [productForm, setProductForm] = useState({
    productName: "",
    productImage: "",
    description: "",
  });
  const [productId, setProductId] = useState("productId");

  // const [products, setProducts] = useState([]);

  const baseURL = "https://reactapisthree.onrender.com/";

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const addProduct = (product) => {
    // console.log(product);
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productImage", product.productImage[0]);
    formData.append("description", product.description);
    axios
      .post(
        "https://reactapisthree.onrender.com/products/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.statusCode === 200) {
          SweetAlert.fire("success", "Product Created Succesfully", "success");
          $("#productAddModal").hide();
          $(".modal-backdrop").remove();
          reset();
          getProducts();
        } else {
          SweetAlert.fire("error", "Bad Request", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = (productForm) => {
    console.log(productForm);
    console.log(productId);
    const formData = new FormData();
    formData.append("productName", productForm.productName);
    formData.append("productImage", productForm.productImage[0]);
    formData.append("description", productForm.description);
    axios
      .post(
        "https://reactapisthree.onrender.com/products/updateProduct",
        formData,
        productId,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.statusCode === 200) {
          SweetAlert.fire("success", "Product Updated Succesfully", "success");
          $("#productEditModal").hide();
          $(".modal-backdrop").remove();
          reset();
          getProducts();
        } else {
          SweetAlert.fire("error", "Bad Request", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const editProduct = (data) => {
    setProductForm({
      ...productForm,
      productName: data.productName,
      productImage: "",
      description: data.description,
    });
    setProductId(data.productId);
  };

  const deleteProduct = (productId) => {
    axios
      .post("https://reactapisthree.onrender.com/products/deleteproduct", {
        productId,
      })
      .then((res) => {
        // console.log(res);
        SweetAlert.fire("success", "Product Deleted Successfully", "success");
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    axios
      .get("https://reactapisthree.onrender.com/products/getproducts")
      .then((res) => {
        // console.log(res.data.products);
        setProductList(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);
  return (
    <div className="product-grid">
      <div className="productHeader">
        <h1 className="headingClass">Products List</h1>
        <div
          className="addClass"
          data-toggle="modal"
          data-target="#productAddModal"
        >
          AddProduct <span className="plusClass">+</span>
        </div>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="productAddModal"
          tabindex="-1"
          aria-labelledby="productAddModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="productAddModalLabel">
                  Add Product
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
                <form onSubmit={handleSubmit(addProduct)}>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="ProductName"
                      name="productName"
                      onChange={(e) => {
                        setProductForm({
                          ...productForm,
                          productName: e.target.value,
                        });
                      }}
                      {...register("productName", {
                        required: "ProductName is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.productName && errors.productName.message}
                  </p>
                  <div class="col">
                    <input
                      type="file"
                      class="form-control"
                      name="productImage"
                      onChange={(e) => {
                        setProductForm({
                          ...productForm,
                          productImage: e.target.files,
                        });
                      }}
                      {...register("productImage", {
                        required: "ProductImage is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors &&
                      errors.productImage &&
                      errors.productImage.message}
                  </p>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={(e) => {
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        });
                      }}
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                  </div>
                  <p className="errorClass">
                    {errors && errors.description && errors.description.message}
                  </p>
                  <button
                    type="button"
                    class="btn btn-secondary closeButton"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {productList.map((product, index) => (
          <div key={index} className="card">
            <h3>{product.productName}</h3>
            <img className="imageClass" src={baseURL + product.productImage} />
            <p>{product.description}</p>
            <div className="footer">
              <button
                className="operation"
                data-toggle="modal"
                data-target="#productEditModal"
                onClick={() => {
                  editProduct(product);
                }}
              >
                Edit
              </button>
              <div
                class="modal fade"
                id="productEditModal"
                tabindex="-1"
                aria-labelledby="productEditModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="productEditModalLabel">
                        Update Product
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
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(updateProduct(productForm));
                      }}>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ProductName"
                            name="productName"
                            value={productForm.productName}
                            onChange={(e) => {
                              setProductForm({
                                ...productForm,
                                productName: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div class="col">
                          <input
                            type="file"
                            class="form-control"
                            name="productImage"
                            // value={productForm.productImage}
                            onChange={(e) => {
                              setProductForm({
                                ...productForm,
                                productImage: e.target.files,
                              });
                            }}
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Description"
                            name="description"
                            value={productForm.description}
                            onChange={(e) => {
                              setProductForm({
                                ...productForm,
                                description: e.target.value,
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
              <button
                className="operation"
                onClick={() => deleteProduct(product.productId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
