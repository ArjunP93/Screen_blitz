import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../Components/admin/navbar/AdminNavbar';
import { AdminSideBar } from '../../Components/admin/adminSidebar/AdminSidebar';
import { TheaterFetch } from '../../api/adminApi';
import { TheaterListTable } from '../../Components/admin/simpletable/TheaterListTable';

function TheaterList() {
  const [theaterDetails, setTheaterDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await TheaterFetch();
      return response;
    }

    fetchData().then(data => {
        setTheaterDetails(data?.theatersDetails);
    });
  }, []);



  return (
    <div>
      <AdminNavbar />
      <AdminSideBar />
      <div className='ms-[20rem] bg-blue-gray-900 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        <TheaterListTable data={theaterDetails} />
      </div>
    </div>
  );
}

export default TheaterList;
