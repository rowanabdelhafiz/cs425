import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Nabar';
import { server } from '../products/server';
import './product.css';

const Product = () => {
  const [Product_name, setProduct_name] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Product_id, setProduct_id] = useState('');
  const [Price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the product name already exists
      const response = await axios.get(`${server}product`);
      const existingProducts = response.data;

      const existingProduct = existingProducts.find(
        (product) => product.Product_name === Product_name
      );

      if (existingProduct) {
        showToast('Product with the same name already exists.', 'error');
      } else {
        // If product name doesn't exist, create a new product
        const newProduct = {
          Product_name,
          Quantity,
          Product_id,
          Price,
        };

        const createResponse = await axios.post(`${server}product`, newProduct);

        if (createResponse.data) {
          // Show success toast
          showToast('Product added successfully!');
        } else {
          showToast('Failed to add product.', 'error');
        }

        // Clear form fields
        setProduct_id('');
        setProduct_name('');
        setQuantity('');
        setPrice('');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error toast
      showToast('An error occurred while processing your request.', 'error');
    }
  };
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h4>Add Product</h4>
        <p>
          <label>
            Product Name <br />
            <input
              type="text"
              className="form-control"
              name="Product_name"
              onChange={(e) => setProduct_name(e.target.value)}
              value={Product_name}
            />
          </label>
        </p>
        <p>
          <label>
            Quantity <br />
            <input
              type="text"
              className="form-control"
              name="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={Quantity}
            />
          </label>
        </p>
        <p>
          <label>
            Product ID <br />
            <input
              type="text"
              className="form-control"
              name="Product_id"
              onChange={(e) => setProduct_id(e.target.value)}
              value={Product_id}
            />
          </label>
        </p>
        <p>
          <label>
            Price <br />
            <input
              type="text"
              className="form-control"
              name="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={Price}
            />
          </label>
        </p>
        <div>
          <button type="submit" className="btn btn-info">
            Add Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Product;
