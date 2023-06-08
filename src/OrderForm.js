import React, { useState, useRef } from "react";
import "./OrderForm.css";

const OrderForm = ({ addOrder }) => {
  const [orderData, setOrderData] = useState({
    orderDescription: "",
    apparel: 0,
    grocery: 0,
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { orderDescription, apparel, grocery, createdBy } = orderData;
      const bodyData = {
        orderDescription,
        countOfItemTypes: {
          apparel: Number(apparel),
          grocery: Number(grocery),
        },
        createdBy,
      };

      const response = await fetch(
        "https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.ok) {
        const order = await response.json();
        addOrder(order);
        setOrderData({
          orderDescription: "",
          apparel: 0,
          grocery: 0,
          createdBy: "",
        });

        // Scroll to the newly added order
        ordersContainerRef.current.scrollTo({
          top: ordersContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ordersContainerRef = useRef(null);

  return (
    <div className="order-form-container" ref={ordersContainerRef}>
      <h3>Add New Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Order Description:</label>
          <input
            type="text"
            name="orderDescription"
            value={orderData.orderDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Apparel:</label>
          <input
            type="number"
            name="apparel"
            value={orderData.apparel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Grocery:</label>
          <input
            type="number"
            name="grocery"
            value={orderData.grocery}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Creator Name:</label>
          <input
            type="text"
            name="createdBy"
            value={orderData.createdBy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <button type="submit">Add Order</button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
