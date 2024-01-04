import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Nabar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './view-product.css';
import { server } from '../products/server';

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProductValues, setEditProductValues] = useState({
      Product_name: '',
      Quantity: '',
      Product_id: '',
      Price: '',
    });
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${server}product`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    const handleCheckboxChange = (productId) => {
      const isSelected = selectedProducts.includes(productId);
      if (isSelected) {
        setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      } else {
        setSelectedProducts([...selectedProducts, productId]);
      }
    };
  
    const handleEdit = (productId) => {
      const productToEdit = products.find((product) => product._id === productId);
      setEditingProduct(productId);
      setEditProductValues({
        Product_name: productToEdit.Product_name,
        Quantity: productToEdit.Quantity,
        Product_id: productToEdit.Product_id,
        Price: productToEdit.Price,
      });
    };
  
    const handleCancelEdit = () => {
      setEditingProduct(null);
      setEditProductValues({
        Product_name: '',
        Quantity: '',
        Product_id: '',
        Price: '',
      });
    };
  
    const handleUpdate = async () => {
      try {
        // Update the selected product
        await axios.put(`${server}product/${editingProduct}`, {
          Product_name: editProductValues.Product_name,
          Quantity: editProductValues.Quantity,
          Product_id: editProductValues.Product_id,
          Price: editProductValues.Price,
        });
  
        // Refresh the product list after update
        const response = await axios.get(`${server}product`);
        setProducts(response.data);
  
        // Clear editing state
        setEditingProduct(null);
        setEditProductValues({
          Product_name: '',
          Quantity: '',
          Product_id: '',
          Price: '',
        });
  
        // Show success message
        toast.success('Product updated successfully!');
      } catch (error) {
        console.error('Error updating product:', error);
        // Show error message
        toast.error('Failed to update product.');
      }
    };
  
    const handleDeleteSelected = async () => {
      try {
        // Delete selected products
        await Promise.all(
          selectedProducts.map(async (productId) => {
            await axios.delete(`${server}product/${productId}`);
          })
        );
  
        // Refresh the product list after deletion
        const response = await axios.get(`${server}product`);
        setProducts(response.data);
  
        // Clear selected products
        setSelectedProducts([]);
  
        // Show success message
        toast.success('Products deleted successfully!');
      } catch (error) {
        console.error('Error deleting products:', error);
        // Show error message
        toast.error('Failed to delete products.');
      }
    };

    return (
        <div>
          <Navbar />
          <h4>View All Products</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={() => {
                      if (selectedProducts.length === products.length) {
                        setSelectedProducts([]);
                      } else {
                        setSelectedProducts(products.map((product) => product._id));
                      }
                    }}
                  />
                </th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleCheckboxChange(product._id)}
                    />
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <Form.Control
                        type="text"
                        value={editProductValues.Product_name}
                        onChange={(e) =>
                          setEditProductValues({
                            ...editProductValues,
                            Product_name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.Product_name
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <Form.Control
                        type="text"
                        value={editProductValues.Quantity}
                        onChange={(e) =>
                          setEditProductValues({
                            ...editProductValues,
                            Quantity: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.Quantity
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <Form.Control
                        type="text"
                        value={editProductValues.Product_id}
                        onChange={(e) =>
                          setEditProductValues({
                            ...editProductValues,
                            Product_id: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.Product_id
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <Form.Control
                        type="text"
                        value={editProductValues.Price}
                        onChange={(e) =>
                          setEditProductValues({
                            ...editProductValues,
                            Price: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.Price
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <>
                        <Button variant="success" size="sm" onClick={handleUpdate}>
                          Save
                        </Button>{' '}
                        <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="primary" size="sm" onClick={() => handleEdit(product._id)}>
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="danger"
            className="delete-button"
            onClick={handleDeleteSelected}
            disabled={selectedProducts.length === 0}
          >
            Delete Selected
          </Button>
          <ToastContainer />
        </div>
      );
      
};

export default ViewProduct;
