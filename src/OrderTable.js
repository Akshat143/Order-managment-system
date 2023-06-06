
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="order-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key="header">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.original.orderId}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'https://631945908e51a64d2be10770.mockapi.io/api/v1/allOrders'
      );
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const columns = [
    { Header: 'Order Id', accessor: 'id' },
    { Header: 'Order Description', accessor: 'orderDescription' },
    { Header: 'Item Types Count', accessor: 'itemTypesCount' },
    { Header: '% Items in Apparel', accessor: 'itemsInApparelPercentage' },
    { Header: 'Created By', accessor: 'createdBy' },
    { Header: 'Created Date', accessor: 'createdAt' },
    { Header: 'Actions', accessor: 'actions' },
  ];

  return <Table columns={columns} data={orders} />;
};

export default OrderTable;



