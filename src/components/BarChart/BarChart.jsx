import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = ({ sampleTransactions }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Calculate cumulative balance per month
    const balanceData = sampleTransactions.reduce((acc, transaction) => {
      const monthYear = new Date(transaction.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const amount =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;

      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, balance: 0 };
      }
      acc[monthYear].balance += amount;

      return acc;
    }, {});

    // Convert the object to a sorted array by month
    const sortedBalanceData = Object.values(balanceData).sort(
      (a, b) => new Date(`01 ${a.month}`) - new Date(`01 ${b.month}`)
    );

    // Calculate cumulative balances
    let cumulativeBalance = 0;
    const months = sortedBalanceData.map((data) => data.month);
    const cumulativeBalances = sortedBalanceData.map((data) => {
      cumulativeBalance += data.balance;
      return cumulativeBalance;
    });

    // Cleanup previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the Line Chart
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Current Balance",
            data: cumulativeBalances,
            borderColor: "#42A5F5", // Line color
            backgroundColor: "rgba(66, 165, 245, 0.2)", // Fill color
            pointBackgroundColor: "#1E88E5", // Point color
            pointBorderColor: "#fff", // Point border color
            pointBorderWidth: 2,
            pointRadius: 5, // Size of points
            pointHoverRadius: 7, // Size of points on hover
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Balance: ₹${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Balance",
            },
            ticks: {
              beginAtZero: true,
            },
            grid: {
              borderDash: [5, 5],
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
  }, [sampleTransactions]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
