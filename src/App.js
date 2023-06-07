import React, { useState } from 'react';
import Orders from './Orders.js';
// import OrderForm from "./OrderForm.js";
import Navbar from "./components/Navbar.js";

const App = () => {
  const [orders, setOrders] = useState([]);

  // const addOrder = (order) => {
  //   setOrders(prevOrders => [...prevOrders, order]);
  // };

  return (
    <div>
      <Navbar />
      <Orders orders={orders} />
      {/* <OrderForm addOrder={addOrder} /> */}
    </div>
  );
};

export default App;
