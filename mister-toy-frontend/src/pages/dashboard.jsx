

import React from 'react';
import {LabelsCountChart} from '../cmps/count-chart'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/toy/toy.action'
import { LabelsPriceChart } from '../cmps/price-chart';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce((acc, toy) => {
            toy.labels.forEach((label) => {
                acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
            })
            return acc

        }, { labelsCountMap: {}, labelsPriceMap: {} })
        Object.keys(chartsData.labelsPriceMap).forEach((label) => chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label])
        return chartsData
    }

    const { labelsCountMap, labelsPriceMap } = getChartsData()

    return (
        <section className='dashboard'>
            <div className='charts'>
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />
            </div>
        </section>
    )
}
