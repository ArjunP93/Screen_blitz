import Booking from "../models/bookingSchema";


const adminHelper = {
    adminChartData: async () => {
        const response = await Booking.aggregate([
         
          {
            $match: {
              $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }]
            }
          },
          {
            $group: {
              _id: {
                month: { $month:"$createdAt"},
                status: "$bookingStatus"
              },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: { month: "$_id.month" },
              data: {
                $push: { status: "$_id.status", count: "$count" }
              }
            }
          },
          {
            $project: {
              _id: 0,
              month:{ $toInt: "$_id.month" },
               data: 1
             
              },
             
          },
          {
            $sort: {
              month: 1
            }
          }
        ]);
      
        // console.log('response aggregation chart data', response);
        const result = Array.from({ length: 12 }, (_, index) => {
          const monthData = response.find(item => item.month === (index + 1));
          return monthData ? monthData : { data: null, month: index + 1 };
        })
        // .map((item,index) => ({
        //   data: item.data,
        //   month: item.data ? item.month : index+1
        // }));
    
    
    
        console.log('requiredData',result)
    
    
        return result;
      },
      adminDashInfo:async()=>{
        const totalBookings = await Booking.countDocuments({})
        const confirmedBookings = await Booking.countDocuments({bookingStatus:'confirmed'})
        const cancelledBookings = await Booking.countDocuments({bookingStatus:'cancelled'})
        const totalRevenue = await Booking.aggregate(
          [
            {$match:{bookingStatus:'confirmed'}},
            {$group:{
              _id:null,
              revenue:{$sum:'$totalAmount'}
            }}
          ]
        )
        return {totalBookings:totalBookings,confirmedBookings:confirmedBookings,cancelledBookings:cancelledBookings,totalRevenue:totalRevenue}
        
      }

}

export default adminHelper