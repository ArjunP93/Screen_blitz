import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../Components/admin/navbar/AdminNavbar';
import { AdminSideBar } from '../../Components/admin/adminSidebar/AdminSidebar';
import LocationTable from '../../Components/admin/location/LocationTable';

function Location() {
 

  return (
    <div>
      <AdminNavbar />
      <AdminSideBar />
      <div className='ms-[20rem] bg-white w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        <LocationTable />
      </div>
    </div>
  );
}

export default Location;
