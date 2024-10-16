import {
    Chart as ChartJs,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale
  } from 'chart.js'
  import { Radar } from 'react-chartjs-2';

  ChartJs.register(LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale)
    // ChartJs.defaults.font.

const RadarChart = ({resize,userDetails}) => {
    let q = []
    userDetails?.totalCountQuestions?.map((i)=>{
        q.push(i)
    })
    const chartData = {
        labels: [
          'বাংলা',
          'ইংরেজি',
          'গণিত',
          "বিজ্ঞান",
          "আইসিটি"
        ],
        datasets: [{
          label: 'Your incurrect answer',
          data: [q[0]?.wrongAns, q[1]?.wrongAns, 0,0,0],
          fill: true,
          pointRadius:5,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'red',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Your currect answer',
          data: [q[0]?.rightAns, q[1]?.rightAns, 0,0,0],
          fill: true,
          pointRadius:5,
          backgroundColor:"Yes",
          hoverBackgroundColor:'Yes',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
    
      
      const options_0 = {
        scale: {
          ticks: { beginAtZero: true }
        }
      };
      const options = {
        scales: {
          r: {
            pointLabels: {
              font: {
                size: 16, // Change this value to customize the label font size
              },
              color:"#f51be6"
            },
          },
        },
      };
      console.log(resize)
  return (
    <div className='w-full flex justify-center items-center'>
       {
        userDetails?.name?.length > 0 ?  <div className="md:w-10/12">
          {
            resize <= 240 && (<Radar data={chartData} options={options_0} />)
          }
          {
            resize > 240 && (<Radar data={chartData} options={options} />)
          }
        </div> : "Loading..."
       }
    </div>
  );
};

export default RadarChart;
