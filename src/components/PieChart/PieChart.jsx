import { useEffect, useRef } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({sampleTransactions}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {

    // Filter and Aggregate Expense Data
    const expenseData = sampleTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, curr) => {
        if (acc[curr.tag]) {
          acc[curr.tag] += curr.amount;
        } else {
          acc[curr.tag] = curr.amount;
        }
        return acc;
      }, {});

    // Extract Labels and Data for the Pie Chart
    const labels = Object.keys(expenseData);
    const data = Object.values(expenseData);

    // Cleanup previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the Pie Chart
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expense Distribution",
            data: data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: $${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
