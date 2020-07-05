import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { saveProduct } from "../actions/productActions";

function ProductsScreen(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {};
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "Save: " +
        name +
        " " +
        price +
        " " +
        image +
        " " +
        brand +
        " " +
        category +
        "" +
        countInStock +
        "" +
        description
    );
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
  return (
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
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="text"
              name="countInStock"
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
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>

          <li>
            <button type="submit" className="button-card">
              Create
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default ProductsScreen;
