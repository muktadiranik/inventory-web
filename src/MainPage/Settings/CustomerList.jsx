import React, { useEffect } from "react";

const CustomerList = ({ data }) => {
  return (
    <div className='row mt-2'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title mb-0'>Responsive Tables</h4>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-nowrap mb-0'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
