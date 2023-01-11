import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function LabelsPriceChart({dataMap}) {
    const data = {
        labels: Object.keys(dataMap),
        datasets: [
          {
            label: 'Toys Prices',
            data: Object.values(dataMap),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(269, 140, 205, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(269, 140, 205, 0.5)',
            ],
            borderWidth: 2,
          },
        ],
      }
      return (
        <div style={{width:'40%' , margin:'auto'}}>
            <h2>Prices</h2>
            <Doughnut data={data} />
        </div>
      )
}