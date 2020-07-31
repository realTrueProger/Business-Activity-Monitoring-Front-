/*eslint-disable react/prop-types*/
import React, {useEffect, useRef, useState} from "react";
import Chart from "chart.js";


const LineChart = ({title, total, labels, counts}) => {
    const canvas = useRef();
    let [totalFor30Days, setTotalFor30Days] = useState(0);

    useEffect(() => {
        if(labels && counts) {
            const ctx = canvas.current.getContext('2d');

            setTotalFor30Days(counts.reduce((a, b) => a + b, 0));

            new Chart(ctx, {
                type: 'line',

                data: {
                    datasets: [{
                        data: counts,
                        backgroundColor: [
                            '#4dc9f6',
                        ],
                    }],
                    labels: labels
                },

                options: {
                    legend: {
                        display: false
                    }
                }
            });
        }
    } );

    return (
        <div>
            <p style={{textAlign: 'center'}}>{`${title} total: ${total} | Last 30 days: ${totalFor30Days}`}</p>
            <canvas ref={canvas}/>
        </div>
    );
};

export default LineChart;