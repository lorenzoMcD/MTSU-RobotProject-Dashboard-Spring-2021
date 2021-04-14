// Barchart for names and ages

import React, {Component} from 'react';
import Chart from 'chart.js'
import 'chartjs-plugin-streaming';
import io from 'socket.io-client'

const socket = io('http://localhost:4000') // connect to listener


class LiveChart extends Component{
    constructor(props){
        super(props);
     
          this.state = {
            // get props being sent from profile.js
            data:this.props.data,
            label:this.props.label,
            text:this.props.text,
            name:this.props.name,
            id:this.props.id,
            task:"musical_task_data",
            level:"level_3",
            run:"run_4"

        }
        
        
    }

    componentDidMount(){

     
      // prepare data for chart
      const mydata = {
        labels:this.state.label,
        datasets: [
          {
            fill:false,
            label: "run",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth:1,
            data: this.state.data
          }
        ]
      };

      // create the chart, and insert data that was prepared above
      var ctx = document.getElementById("myChart"); 
      var myChart = new Chart(ctx, {
          type: 'line',
          data: mydata,
          options: { 
              responsive: true, 
              maintainAspectRatio: true,
              title:{
                display:true,
                text:this.state.text,
                fontSize:30

            },
            legend:{
              display: true,
              position:'right',
              labels:{
                  fontColor: "#000080"
              }
              
          
          
          },
          scales:{
            yAxes:[{

                ticks:{
                    beginAtZero:true
                }
            }]
        }
            
          }
      });

      
      // example of how I need the props to look once you pass in 
      console.log(this.state.task + ".level_history_data." + this.state.level + "." + this.state.run + "." + 5 ) 


        // grab data that is being emit from the server.js and add to chart
        socket.on('data1',(res) =>{
          
          // var below creates random x axis point to add to chart 
          var num = Array.from({length:1}, () => Math.floor(Math.random()*590)+10) 

         // server will send a response
         // need to check if the id from the response matches the current user id on profile page
         // if it does then we will add this data to chart    
         if (this.state.id === res.id){
          this.addData(myChart,num,res)
         }
        
         else{
          // call function that adds random data to chart every 5 seconds 
          this.addDataRandom(myChart,num,res)
         }
          
          //this.updateChartData(myChart,res,0);
        
        })
        
    }


    // add data updates from mongodb
    addData(chart,label,data){

      // we may need to perform more check in this function to determine the exact run, and level to update the chart on 
      // as of now the chart will just update for the run 1 , level 1 charts 

      var lenOfArray = this.state.label.length

      var resProp = 'musical_task_data.level_history_data.level_1.run_1.' + (lenOfArray)


      chart.data.labels.push(label);

      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data.data[resProp])
      })
      
      
      chart.update();
    }

    
    // add random data to chart every 5 seconds from server 
    addDataRandom(chart,label,data){

      chart.data.labels.push(label);

      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data)
      })
      
      
      chart.update();
    }
   

    
    updateChartData(chart, data, dataSetIndex){
      chart.data.datasets[dataSetIndex].data = data;
      chart.update()
    }




render(){


    return (

        <div className="chart">

          <canvas id="myChart"></canvas>

        </div>


    )
}




}

export default LiveChart;