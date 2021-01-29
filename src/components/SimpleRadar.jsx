import React from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: ["Agua", "Alimento", "Energia"],
  datasets: [
    {
      label: "Pratica_1",
      data: [2, 10, 2],
      backgroundColor: "rgba(255, 99, 132, 0.75)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Pratica_2",
      data: [8, 2, 4],
      backgroundColor: "rgba(54, 162, 235, 0.75)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Pratica_3",
      data: [4, 4, 7],
      backgroundColor: "rgba(255, 206, 86, 0.75)",
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true ,suggestedMax: 10},
    gridLines: {
      color: "rgba(0, 0, 0, 0.25)",
    },
  },
  legend: {
    position: "bottom",
  },
  title: {
    text: "Benchmark",
    display: false,
    fullWidth: true,
    fontSize: 24,
    position: "top",
  },
  devicePixelRatio: 2,
  aspectRatio: 1,
  // responsive: true,
};

const SimpleRadar = () => (
  <>
    <Radar data={data} options={options} />
  </>
);

export default SimpleRadar;
