import React, { useState,useEffect } from 'react'

import { AdminSideBar } from '../../../Components/admin/adminSidebar/AdminSidebar'
import { AdminNavbar } from '../../../Components/admin/navbar/AdminNavbar'
import Loading from '../../../Components/loading/Loading'
import AdminDashGraph from '../../../Components/admin/dashbaord/AdminDashGraph'
import { getAdminChartData } from '../../../api/adminApi'

function AdminDashboard() {
const [isLoading,setIsLoading]  = useState(true)

const [chartData, setChartData] = useState([]);
  const [dashInfo, setDashInfo] = useState({});

  useEffect(() => {
    async function fetchChart() {
      const response = await getAdminChartData();
      return response;
    }
    fetchChart().then((result) => {
      console.log("reessssponsee", result);
      setChartData(result?.chartData);
      setDashInfo(result?.dashInfo);
      setIsLoading(false)
    });
  }, []);



  return (
    <div>
      
        <AdminNavbar/>
        
       
        <AdminSideBar/>
        <div className='  ms-[20rem] overflow-y-auto   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        
          <div>
            <div className="flex flex-wrap gap-5 mx-12 pt-10">
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-black">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  total bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.totalBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-black">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  confirmed bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.confirmedBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-black">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  cancelled Bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.cancelledBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-black">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  total Revenue
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.totalRevenue
                    ? dashInfo.totalRevenue[0].revenue.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                    : 0}
                </p>
              </div>
            </div>
{console.log('chartData in admin dasgggs',chartData)}
           {isLoading ? <Loading/>:<AdminDashGraph chartData={chartData} />} 
          </div>
        

        </div>

     
      </div>






    
    
    
  
  )
}

export default AdminDashboard