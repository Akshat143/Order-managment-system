import React, { useState } from 'react';
import Orders from './Orders';
import OrderForm from './OrderForm';
import Navbar from './components/Navbar';

const App = () => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <div>
      <Navbar />
      <Orders orders={orders} />
      <OrderForm addOrder={addOrder} />
    </div>
  );
};

export default App;
