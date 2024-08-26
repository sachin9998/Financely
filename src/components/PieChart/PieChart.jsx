import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";

// Register necessary components for Chart.js
Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ sampleTransactions }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [spend, setSpend] = useState(false);

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

    if (data.length === 0) {
      setSpend(true); // No expenses, show "Spend Something"
      return;
    } else {
      setSpend(false); // Expenses exist, show the chart
    }

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
                return `${tooltipItem.label}: ₹${tooltipItem.raw}`;
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
    <div className="sm:w-[350px] w-[50vw]">
      {spend ? (
        <div className="text-center text-sm sm:text-lg font-normal h-full">
          <p>Seems like you haven't spent anything till now... </p>
        </div>
      ) : (
        <canvas ref={chartRef} />
      )}
    </div>
  );
};

export default PieChart;
