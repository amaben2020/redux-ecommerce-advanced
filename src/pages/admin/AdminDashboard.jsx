import { useEffect, useState } from 'react';
import AdminProductCard from '../../components/cards/AdminProductCard';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../utils/product';

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>
        <div className="col-md-10">ADMIN DASHBOARD</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
