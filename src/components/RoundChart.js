import React, {useEffect, useRef} from "react";
import Chart from "chart.js";


const RoundChart = ({title, total}) => {
    const canvas = useRef();

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');

        new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
                datasets: [{
                    data: [
                        10,
                        20,
                        30
                    ],
                    backgroundColor: [
                        '#4dc9f6',
                        '#f67019',
                        '#f53794',
                    ],
                }],
                labels: [
                    'Red',
                    'Orange',
                    'Yellow',
                ]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                }
            }
        });
    }, [total]);

    return (
        <div>
            <p style={{textAlign: 'center'}}>{`${title}: ${total}`}</p>
            <canvas ref={canvas}/>
        </div>
    );
};

export default RoundChart;