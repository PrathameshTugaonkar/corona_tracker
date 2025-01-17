import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, deaths, recovered}}, country) =>{
    const [dailyData, setDailyData] = useState([]);
    useEffect(()=>{
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    console.log();
    const barChart = (
        confirmed 
        ? (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label:'People',
                    backgroundColor:['rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)'],
                    data:[confirmed.value, recovered.value, deaths.value],
                },
            ],
            }}
            options={{
                legend: {display:false},
                title:{display:true, text:'Chart' },
                // `Current state in ${[country.title]}`
            }}/>
            ) : null 
    );
    const lineChart = (
        dailyData.length
        ? (
        <Line 
        data={{
            labels:dailyData.map(({date})=>date),
            datasets: [{
                data:dailyData.map(({confirmed})=> confirmed),
                label:'Infected',
                borderColor: '#3333ff',
                fill: true,
            },{
                data:dailyData.map(({deaths})=> deaths),
                label:'Deaths',
                borderColor: '#3333ff',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true,
        }],
        }}/>) : null
    );
    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}


export default Chart;