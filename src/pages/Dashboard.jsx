import Header from "../components/Header/Header.jsx";
import Card from "../components/Modal/Card.jsx";
import Graph from "../components/Modal/Graph.jsx";
import PieChart from "../components/Modal/PieChart.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard">
        <div className="card-container">
          <Card />
          <Card />
          <Card />
        </div>

        <div className="visuals">
          <div className="graph-container">
            <Graph />
          </div>
          <div className="piechart-container">
            <PieChart />
          </div>
        </div>

        <div className="transactions-container">
          <div className="transaction-header">
            <h2>My Transactions</h2>

            <div className="sort-transactions">
              <button>No Sort</button>
              <button>Sort by Date</button>
              <button>Sort by Amount</button>
            </div>

            <div className="transaction-btns">
              <button className="btn ">Export to CSV</button>
              <button className="btn btn-secondary">Export to CSV</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Tag</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Sachin</td>
                <td>Subscription</td>
                <td>2024-08-01</td>
                <td>$100</td>
                <td>Monthly</td>
              </tr>

              <tr>
                <td>Vinod</td>
                <td>Purchase</td>
                <td>2024-08-15</td>
                <td>$250</td>
                <td>One-time</td>
              </tr>

              <tr>
                <td>Hitesh</td>
                <td>Refund</td>
                <td>2024-08-18</td>
                <td>-$50</td>
                <td>Returned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
