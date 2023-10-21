import React, { useEffect, useState } from "react";

import { TheaterNavbar } from "../../../Components/theater/navbar/TheaterNavbar";
import { TheaterSideBar } from "../../../Components/theater/theaterSidebar/TheaterSideBar";
import { Approve } from "../../../Components/theater/Approve";
import TheaterDashGraph from "../../../Components/theater/dashboard/theaterDashGraph";
import { getChartData } from "../../../api/theaterApi";
import { useSelector } from "react-redux";
import Loading from "../../../Components/loading/Loading";

function TheaterDashboard(props) {
  const theaterId = useSelector(
    (store) => store.theater.theaterRedux.theaterId
  );
  const [isLoading,setIsLoading] = useState(true)
  const [chartData, setChartData] = useState([]);
  const [dashInfo, setDashInfo] = useState({});

  useEffect(() => {
    async function fetchChart() {
      const response = await getChartData(theaterId);
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
      <TheaterNavbar />

      <TheaterSideBar />
      <div className="  ms-[20rem] overflow-y-auto  bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]">
        {props.approval ? (
          <div>
            <div className="flex flex-wrap gap-5 mx-12 pt-10">
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-brown-800">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  total bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.totalBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-brown-800">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  confirmed bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.confirmedBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-brown-800">
                <p className="p-4 text-white uppercase text-center font-bold text-xl">
                  cancelled Bookings
                </p>
                <p className="text-white uppercase text-center font-semibold text-lg">
                  {dashInfo?.cancelledBookings}
                </p>
              </div>
              <div className="w-56 h-32 rounded-xl shadow-xl hover: bg-brown-800">
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
           {isLoading ? <Loading/>:<TheaterDashGraph chartData={chartData} />} 
          </div>
        ) : (
          <Approve />
        )}
      </div>
    </div>
  );
}

export default TheaterDashboard;
