import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Card from "../components/Card/Card.jsx";
import Graph from "../components/Graph/Graph.jsx";
import PieChart from "../components/PieChart/PieChart.jsx";

const Dashboard = () => {



  
  return (
    <div className="w-full bg-[var(background-color)]">
      {/* <Header/> */}

      <div className="max-w-screen-xl mx-auto">
        {/* Cards Container */}
        <div className="flex justify-between my-10 flex-wrap">
          <Card title={"Current Balance"} btnText={"Reset Balance"} />
          <Card title={"Total Income"} btnText={"Add Income"} />
          <Card title={"Total Expenses"} btnText={"Add Expense"} />
        </div>

        <div className="my-12 w-full h-[500px] flex gap-[5%]">
          <div className="box-shadow rounded-sm w-[60%]">
            <Graph />
          </div>

          <div className="box-shadow rounded-sm w-[35%]">
            <PieChart />
          </div>
        </div>

        <div className="w-full my-8 flex items-center justify-center gap-6 text-sm">
          <div className="flex-1 box-shadow flex gap-4 items-center space-between px-3 py-2 rounded-md outline-none border-none">
            <FiSearch className="" />
            <input
              className="w-full border-none outline-none"
              type="text"
              placeholder="Search by Name"
            />
          </div>

          <div className="box-shadow w-[20%] py-2 px-3 rounded-md">
            <select name="" id="" className="w-full">
              <option value="">All</option>
              <option value="">Income</option>
              <option value="">Expense</option>
            </select>
          </div>
        </div>

        {/* My Transactions */}
        <div className="mt-4 mb-16 box-shadow py-8 px-8">
          <div className="py-1 flex justify-between items-center">
            <h2 className="text-2xl font-medium tracking-wide mb-4">
              My Transactions
            </h2>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                No Sort
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Sort By Date
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Sort by Amount
              </button>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button className="border border-[var(--theme)] text-[var(--theme)] px-8 py-2 rounded hover:bg-[var(--theme)] hover:text-white hover:border-none transition-all">
                Export to CSV
              </button>

              <button className="bg-[var(--theme)] text-white px-8 py-2 rounded hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all">
                Import to CSV
              </button>
            </div>
          </div>

          <div className="mt-5 ">
            <table className="auto min-w-full">
              <thead>
                <tr className="border">
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Tag</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td>Sachin</td>
                  <td>Subscription</td>
                  <td>2024-08-01</td>
                  <td>$100</td>
                  <td>Monthly</td>
                </tr>

                <tr className="border-b">
                  <td>Vinod</td>
                  <td>Purchase</td>
                  <td>2024-08-15</td>
                  <td>$250</td>
                  <td>One-time</td>
                </tr>

                <tr className="border-b">
                  <td>Hitesh</td>
                  <td>Refund</td>
                  <td>2024-08-18</td>
                  <td>-$50</td>
                  <td>Returned</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-5 flex justify-end gap-2">
              <button className="border p-1 w-[32px]">
                <IoIosArrowBack />
              </button>
              <button className="border border-[var(--theme)] p-1 w-[32px]">
                1
              </button>
              <button className="border p-1 w-[32px]">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
