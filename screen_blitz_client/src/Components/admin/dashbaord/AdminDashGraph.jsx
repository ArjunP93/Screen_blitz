import React from 'react';
import ReactApexChart from 'react-apexcharts';

class AdminDashGraph extends React.Component {
  constructor(props) {
    const confirmedData = props.chartData.map((obj)=>{
      if(obj.data)
      {
        const data =  obj.data.find(result=>result.status==='confirmed')
  return data.count
}
      else{ return 0}

    })
    const cancelledData = props.chartData.map((obj)=>{
      if(obj.data){
        const data =  obj.data.find(result=>result.status==='cancelled')
  return data.count
      }else{
        return 0
      }
    })
  
    super(props);

    this.state = {
      series: [
        {
          name: 'Confirmed',
          data: confirmedData,
          
        },
        {
          name: 'Cancelled',
          data: cancelledData,
        },
       
      ],
      options: {
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
        },
        colors: ['#5bc32d','#f93a3a'],
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={430} />
      </div>
    );
  }
}

export default AdminDashGraph;
