import React, { useState } from 'react';

const OrderForm = ({ addOrder }) => {
  const [order, setOrder] = useState({
    orderId: '',
    orderDescription: '',
    itemTypesCount: '',
    percentItemsInApparel: '',
    createdBy: '',
    createdDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(order);
    setOrder({
      orderId: '',
      orderDescription: '',
      itemTypesCount: '',
      percentItemsInApparel: '',
      createdBy: '',
      createdDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="orderId"
        value={order.orderId}
        placeholder="Order Id"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="orderDescription"
        value={order.orderDescription}
        placeholder="Order Description"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="itemTypesCount"
        value={order.itemTypesCount}
        placeholder="Count of Item Types"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="percentItemsInApparel"
        value={order.percentItemsInApparel}
        placeholder="% of Items in Apparel"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="createdBy"
        value={order.createdBy}
        placeholder="Created By"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="createdDate"
        value={order.createdDate}
        placeholder="Created Date"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
