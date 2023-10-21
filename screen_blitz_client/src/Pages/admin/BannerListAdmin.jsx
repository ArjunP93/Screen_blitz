import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../Components/admin/navbar/AdminNavbar';
import { AdminSideBar } from '../../Components/admin/adminSidebar/AdminSidebar';
import { BannerListTable } from '../../Components/admin/simpletable/BannerListTable';
import { getBannners } from '../../api/adminApi';

function BannerListAdmin() {
  const [bannerDetails, setBannerDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getBannners()
      return response

      
    }

    fetchData().then(data => {
      setBannerDetails(data?.bannerDetails);
    });
  }, []);



  return (
    <div>
      <AdminNavbar />
      <AdminSideBar />
      <div className='ms-[20rem] bg-blue-gray-900 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        <BannerListTable data={bannerDetails} setBannerDetails={setBannerDetails} />
      </div>
    </div>
  );
}

export default BannerListAdmin;
