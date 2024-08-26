import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import moment from "moment";
import { parse } from "papaparse";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BarChart from "../components/BarChart/BarChart.jsx";
import Card from "../components/Card/Card.jsx";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header.jsx";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal.jsx";
import NoTransaction from "../components/NoTransaction/NoTransaction.jsx";
import PieChart from "../components/PieChart/PieChart.jsx";
import Table from "../components/Table/Table.jsx";
import { auth, db } from "../firebase";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  console.log("Current Transactions", transactions);

  const navigate = useNavigate();

  // Income Modal ==>
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
    console.log("Show income pressed");
  };

  const hideIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };

  // Expense Modal ==>
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const hideExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  // ===> Submitting Income Expense Entry <====
  const submitValues = async (values) => {
    console.log("Value submitted", values);

    const newTransaction = {
      type: values.type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    console.log("newTransaction", newTransaction);

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    // addTransaction(newTransaction);
    // calculateBalance();
    try {
      // Add transaction to Firestore
      await addTransaction(newTransaction);

      // Update local state and re-fetch transactions
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      await fetchTransactions(); // Re-fetch transactions to ensure state sync

      // Hide modals and recalculate balance
      setIsExpenseModalVisible(false);
      setIsIncomeModalVisible(false);
      calculateBalance();

      toast.success("Transaction Added!");
    } catch (error) {
      console.error("Error adding transaction: ", error);
      toast.error("Couldn't add transaction");
    }
  };

  // Adding transaction to database
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }

  // Fetch transactions
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      // toast.success("Transactions Fetched!");
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate the initial balance, income, and expenses
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // const processChartData = () => {
  //   const balanceData = [];
  //   const spendingData = {};

  //   transactions.forEach((transaction) => {
  //     const monthYear = moment(transaction.date).format("MMM YYYY");
  //     const tag = transaction.tag;

  //     if (transaction.type === "income") {
  //       if (balanceData.some((data) => data.month === monthYear)) {
  //         balanceData.find((data) => data.month === monthYear).balance +=
  //           transaction.amount;
  //       } else {
  //         balanceData.push({ month: monthYear, balance: transaction.amount });
  //       }
  //     } else {
  //       if (balanceData.some((data) => data.month === monthYear)) {
  //         balanceData.find((data) => data.month === monthYear).balance -=
  //           transaction.amount;
  //       } else {
  //         balanceData.push({ month: monthYear, balance: -transaction.amount });
  //       }

  //       if (spendingData[tag]) {
  //         spendingData[tag] += transaction.amount;
  //       } else {
  //         spendingData[tag] = transaction.amount;
  //       }
  //     }
  //   });

  //   const spendingDataArray = Object.keys(spendingData).map((key) => ({
  //     category: key,
  //     value: spendingData[key],
  //   }));

  //   return { balanceData, spendingDataArray };
  // };

  // const { balanceData, spendingDataArray } = processChartData();

  // const balanceConfig = {
  //   data: balanceData,
  //   xField: "month",
  //   yField: "balance",
  // };

  // const spendingConfig = {
  //   data: spendingDataArray,
  //   angleField: "value",
  //   colorField: "category",
  // };

  const resetBalance = () => {
    toast.success("Coming Soon!");
  };

  const importFromCSV = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  };

  // =========>>>>>> CHART DATA <<<==========
  const processChartData = (transactions) => {
    const spendingData = {};

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        if (spendingData[transaction.tag]) {
          spendingData[transaction.tag] += transaction.amount;
        } else {
          spendingData[transaction.tag] = transaction.amount;
        }
      });

    return Object.keys(spendingData).map((key) => ({
      category: key,
      value: spendingData[key],
    }));
  };

  const spendingDataArray = processChartData(transactions);

  const config = {
    data: spendingDataArray,
    angleField: "value",
    colorField: "category",
    radius: 1, // Full circle radius
    innerRadius: 0, // No inner radius, full pie chart
    label: {
      type: "outer",
      content: "{name} ({percentage})",
    },
    tooltip: {
      fields: ["category", "value"],
      formatter: (datum) => ({
        name: datum.category, // Ensure the correct key is used here
        value: `$${datum.value}`, // Customize the value display
      }),
    },
    interactions: [{ type: "element-active" }],
  };
  if (loading) {
    return (
      <>
        <div className="sm:p-0 bg-[var(--theme)] text-[var(--white)] font-medium text-lg leading-7 w-full sticky top-0 left-0 z-50">
          <Header />
        </div>
        <Loader />;
      </>
    );
  } else
    return (
      <div className="w-full bg-[var(background-color)]">
        <div className="sm:p-0 bg-[var(--theme)] text-[var(--white)] font-medium text-lg leading-7 w-full sticky top-0 left-0 z-50">
          <Header />
        </div>
        <div className="max-w-screen-xl mx-auto">
          {/* Cards Container */}
          <div className="flex justify-center items-center my-10 flex-wrap gap-4 sm:justify-between">
            <Card
              title={"Current Balance"}
              balance={currentBalance}
              btnText={"Reset Balance"}
              performAction={resetBalance}
            />
            <Card
              title={"Total Income"}
              btnText={"Add Income"}
              performAction={showIncomeModal}
              balance={income}
            />
            <Card
              title={"Total Expenses"}
              btnText={"Add Expense"}
              performAction={showExpenseModal}
              balance={expense}
            />
          </div>

          {/* <AddIncome /> */}
          <Modal
            title={"Add Income"}
            isModalOpen={isIncomeModalVisible}
            closeModal={hideIncomeModal}
            submitValues={submitValues}
            type={"income"}
          />

          {/* <AddIncome /> */}
          <Modal
            title={"Add Expense"}
            isModalOpen={isExpenseModalVisible}
            closeModal={hideExpenseModal}
            submitValues={submitValues}
            type={"expense"}
          />

          {transactions.length === 0 ? (
            <NoTransaction />
          ) : (
            <div className="sm:my-12 flex flex-col gap-5 sm:flex sm:h-[450px] sm:flex-row sm:items-center sm:gap-[5%]">
              {/* <div className="my-12 w-full flex flex-col justify-center items-center h-full sm:flex-row sm:gap-[5%] "> */}
              <div className=" box-shadow rounded-sm sm:w-[60%] p-2 mx-4 sm:mx-0 h-auto sm:h-full">
                <h2 className="mx-6 my-4 text-xl font-medium tracking-wide">
                  Monthly Balance
                </h2>
                <div className="mx-4 my-1">
                  <BarChart sampleTransactions={transactions} />
                </div>
              </div>

              <div className="box-shadow rounded-sm sm:w-[35%] sm:h-full p-2 mx-4 sm:mx-0">
                {/* <div className=""> */}
                <h2 className="mx-6 my-4 text-xl font-medium tracking-wide">
                  Total Spending
                </h2>
                {/* </div> */}
                <div className="flex items-center justify-center">
                  <PieChart sampleTransactions={transactions} />
                </div>
              </div>
            </div>
          )}

          {/* My Transactions */}
          <div className="flex flex-col m-4 sm:mx-0 md:p-8 mt-5 mb-16 box-shadow rounded-sm">
            <Table importFromCSV={importFromCSV} transactions={transactions} />
          </div>
        </div>
        <div className="text-sm right- bottom-0 w-full sm:text-base sm:w-full bg-[var(--theme)] text-white p-3 flex items-center justify-center">
          <Footer />
        </div>
      </div>
    );
};

export default Dashboard;
