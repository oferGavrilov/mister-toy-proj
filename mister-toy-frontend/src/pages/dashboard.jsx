

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { useEffect } from 'react';
import { loadToys } from '../store/toy/toy.action';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getSumOfType(type) {
        return toys.filter(toy => toy.labels.some(label => label === type)).filter(toy => toy.inStock === true).length
    }

    const data = {
        labels: ['battery powered', 'doll', 'baby'],
        datasets: [
            {
                label: '# of Votes',
                data: [getSumOfType('battery powered'), getSumOfType('doll'), getSumOfType('baby')],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const prices = {
        labels: ['battery powered', 'doll', 'baby'],
        datasets: [
            {
                label: 'number of type',
                data: [getSumOfType('battery powered'), getSumOfType('doll'), getSumOfType('baby')],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='charts' style={{width:'60%' , margin:'auto'}}>
            <Doughnut data={data} />
        </div>
    )
}
