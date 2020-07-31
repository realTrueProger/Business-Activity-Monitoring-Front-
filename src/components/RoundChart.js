/*eslint-disable react/prop-types*/
import React, {useEffect, useRef} from "react";
import Chart from "chart.js";


const RoundChart = ({title, total, labels, counts}) => {
    const canvas = useRef();

    useEffect(() => {
        if(labels && counts) {
            const ctx = canvas.current.getContext('2d');

            new Chart(ctx, {
                type: 'doughnut',

                data: {
                    datasets: [{
                        data: counts,
                        backgroundColor: [
                            '#4dc9f6',
                            '#f67019',
                            '#f53794',
                            '#537bc4',
                            '#acc236',
                            '#166a8f',
                            '#00a950',
                            '#58595b',
                            '#8549ba'
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
            <p style={{textAlign: 'center'}}>{`${title}: ${total}`}</p>
            <canvas ref={canvas}/>
        </div>
    );
};

export default RoundChart;