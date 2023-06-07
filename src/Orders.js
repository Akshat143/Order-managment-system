import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders"
      );
      const data = await response.json();
      // console.log(data);
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteOrderId(id);
  };

  const confirmDelete = async () => {
    try {
      const updatedOrders = orders.filter(
        (order) => order.id !== deleteOrderId
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setDeleteOrderId(null);

      await fetch(
        `https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders/${deleteOrderId}`, 
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setDeleteOrderId(null);
  };

  const filterOrders = () => {
    if (searchTerm === "") {
      setErrorMessage("Enter Order ID!");
      setFilteredOrders([]);
      return;
    }

    const filtered = orders.filter((order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    );

    if (filtered.length === 0) {
      setErrorMessage("No data found for this Order ID!");
    } else {
      setErrorMessage("");
    }

    setFilteredOrders([]);
    setFilteredOrders(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setErrorMessage("");
    setFilteredOrders(orders);
  };

  return (
    <div className="orders-container">
      <div className="heading-container">
        <h1>Order Management System</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          &nbsp;<button onClick={filterOrders}>Search</button>
          &nbsp;<button onClick={clearSearch}>Clear</button>
        </div>
      </div>
      <div className="order-details">

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <table>
          <thead>
            <tr className="table-heading">
              <th>Order Id</th>
              <th>Order Description</th>
              <th>Count of Item Types Included in Order</th>
              <th>% of Items in Apparel</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(filteredOrders)} */}
            {filteredOrders.map((order,index) => (
              <tr key={index} className="table-row">
                <td>{order.id}</td>
                <td>{order.orderDescription}</td>
                <td>
                  Apparel: {order.countOfItemTypes?.apparel ?? 0} Grocery:{" "}
                  {order.countOfItemTypes?.grocery ?? 0}
                </td>
                <td>
                  {order.countOfItemTypes?.apparel !== 0 &&
                  (order.countOfItemTypes?.apparel ||
                    order.countOfItemTypes?.grocery)
                    ? `${Math.round(
                        (order.countOfItemTypes?.apparel /
                          (order.countOfItemTypes?.apparel +
                            order.countOfItemTypes?.grocery)) *
                          100
                      )}%`
                    : "0%"}
                </td>
                <td>{order.createdBy}</td>
                <td>{order.createdAt}</td>
                <td>
                  {deleteOrderId === order.id ? (
                    <>
                      <span>Are you sure you want to delete?</span>
                      <p></p>
                      &nbsp;<button onClick={confirmDelete}>Yes</button>
                      &nbsp;<button onClick={cancelDelete}>No</button>
                    </>
                  ) : (
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
