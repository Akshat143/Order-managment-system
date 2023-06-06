import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders"
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteOrderId(id);
  };

  const confirmDelete = async () => {
    try {
      const updatedOrders = orders.filter((order) => order.id !== deleteOrderId);
      setOrders(updatedOrders);
      setDeleteOrderId(null);

      await fetch(
        `https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders/${deleteOrderId}`,
        {
          method: "DELETE",
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setDeleteOrderId(null);
  };

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
          {orders.map((order) => (
            <tr key={order.id}>
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
                    <span>
                      Are you sure you want to delete Order ID {order.id}?
                    </span>
                    &nbsp;<button onClick={confirmDelete}>Yes</button>
                    &nbsp;<button onClick={cancelDelete}>No</button>
                  </>
                ) : (
                  <button onClick={() => handleDelete(order.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
