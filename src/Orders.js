import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderDescription}</td>
              <td>
                Apparel: {order.countOfItemTypes?.apparel ?? 0} | Grocery: {order.countOfItemTypes?.grocery ?? 0}
              </td>
              <td>{Math.round((order.countOfItemTypes?.apparel / (order.countOfItemTypes?.apparel + order.countOfItemTypes?.grocery)) * 100)}%</td>
              <td>{order.createdBy}</td>
              <td>{order.createdAt}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
