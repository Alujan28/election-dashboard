import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ElectionChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const chartData = {
    labels: ['A K D', 'SAJITH', 'RANIL', 'NAMAL'],
    votes: [5634915, 4363035, 2299767, 342781]
};

const colors = ['rgb(212, 0, 0)', 'rgb(0, 151, 57)', 'rgb(0, 128, 0)', 'rgb(138, 21, 56)'];

const barChartData = {
    labels: chartData.labels,
    datasets: [
        {
            label: 'Votes',
            data: chartData.votes,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 1)')),
            borderWidth: 1,
        },
    ],
};

const pieChartData = {
    labels: chartData.labels,
    datasets: [
        {
            data: chartData.votes,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 1)')),
            borderWidth: 1,
        },
    ],
};

const ElectionChart = () => {
    return (
        <div className="election-chart-container">
            <div className="chart-section barchart">
                <div className="chart-wrapper">
                    <Bar 
                        data={barChartData} 
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: { ticks: { display: false } },
                                y: { display: false }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        generateLabels: (chart) => {
                                            const datasets = chart.data.datasets;
                                            return chart.data.labels.map((label, index) => {
                                                const dataset = datasets[0];
                                                return {
                                                    text: label,
                                                    fillStyle: dataset.backgroundColor[index],
                                                    strokeStyle: dataset.borderColor[index],
                                                    hidden: false,
                                                    index: index,
                                                };
                                            });
                                        },
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return `${context.chart.data.labels[context.dataIndex]}: ${context.raw.toLocaleString()} votes`;
                                        }
                                    }
                                },
                                datalabels: {
                                    anchor: 'start',
                                    align: 'right',
                                    formatter: (value, context) => context.chart.data.labels[context.dataIndex],
                                    color: '#ffffff',
                                    font: { weight: 'bold' }
                                }
                            }
                        }} 
                    />
                </div>
            </div>

            <div className="chart-section piechart">
                <div className="chart-wrapper">
                    <Pie 
                        data={pieChartData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return `${context.chart.data.labels[context.dataIndex]}: ${context.raw.toLocaleString()} votes`;
                                        }
                                    }
                                },
                                datalabels: {
                                    formatter: (value, context) => context.chart.data.labels[context.dataIndex],
                                    color: '#ffffff',
                                    font: { weight: 'bold' }
                                }
                            }
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ElectionChart;
