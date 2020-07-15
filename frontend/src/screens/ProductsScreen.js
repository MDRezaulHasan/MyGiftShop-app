import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";

function ProductsScreen(props) {
  const [modelVisible, setModelVisible] = useState(false);
  const [id, setId] = useState(" ");
  const [name, setName] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [image, setImage] = useState(" ");
  const [brand, setBrand] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [countInStock, setCountInStock] = useState(" ");
  const [description, setDescription] = useState(" ");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModelVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave, successDelete]);

  const openModel = (product) => {
    setModelVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setDescription(product.description);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button-card" onClick={() => openModel({})}>
          Create Product
        </button>
      </div>
      {modelVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h3>Create Product</h3>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name || " "}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image || " "}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price || " "}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand || " "}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock || " "}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category || " "}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description || " "}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>

              <li>
                <button type="submit" className="button-card">
                  {id ? "update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModelVisible(false)}
                  className="button-card"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button-edit"
                    onClick={() => openModel(product)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="button-delete"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsScreen;
