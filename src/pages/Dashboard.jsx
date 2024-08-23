import { addDoc, collection, getDocs, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import emptyTransactionCard from "../assets/transactions.svg";
import Card from "../components/Card/Card.jsx";
import Graph from "../components/Graph/Graph.jsx";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal.jsx";
import PieChart from "../components/PieChart/PieChart.jsx";
import { auth, db } from "../firebase";

const Dashboard = () => {
  // const transactions = [
  //   {
  //     type: "income",
  //     amount: 2200,
  //     tag: "salary",
  //     name: "August Salary",
  //     date: "2024-08-23",
  //   },
  //   {
  //     type: "expense",
  //     amount: 699,
  //     tag: "food",
  //     name: "July Wifi Recharge",
  //     date: "2024-08-23",
  //   },
  // ];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
    console.log("Show income pressed");
  };

  const hideIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const hideExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  // ===> Submitting Income Expense Entry <====
  const submitValues = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with OD: ", docRef.id);
      toast.success("Transaction Added!");

      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
    } catch (error) {
      console.log(error);
      toast.error("Could not add transaction");
    }
  }

  const resetBalance = () => {};

  // Fetch transactions
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setCurrentBalance(incomeTotal - expenseTotal);
  }

  // getting all firebase docs
  useEffect(() => {}, []);

  useEffect(() => {}, []);

  if (loading) {
    <Loader />;
  }

  return (
    <div className="w-full bg-[var(background-color)]">
      <div className="max-w-screen-xl mx-auto">
        {/* Cards Container */}
        <div className="flex justify-between my-10 flex-wrap">
          <Card
            title={"Current Balance"}
            balance={currentBalance}
            btnText={"Reset Balance"}
          />
          <Card
            title={"Total Income"}
            btnText={"Add Income"}
            openModal={showIncomeModal}
            balance={income}
          />
          <Card
            title={"Total Expenses"}
            btnText={"Add Expense"}
            openModal={showExpenseModal}
            balance={expense}
          />
        </div>

        {/* <AddIncome /> */}
        <Modal
          title={"Add Income"}
          isModalOpen={isIncomeModalVisible}
          closeModal={hideIncomeModal}
          submitForm={submitValues}
        />

        {/* <AddIncome /> */}
        <Modal
          title={"Add Expense"}
          isModalOpen={isExpenseModalVisible}
          closeModal={hideExpenseModal}
          submitForm={submitValues}
        />

        {isDataAvailable ? (
          <div className="my-12 w-full h-[500px] flex gap-[5%]">
            <div className="box-shadow rounded-sm w-[60%]">
              <Graph />
            </div>

            <div className="box-shadow rounded-sm w-[35%]">
              <PieChart />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-center justify-between my-10">
            <img width={300} src={emptyTransactionCard} alt="" />
            <p>You Have No Transactions Currently</p>
          </div>
        )}

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
