import { addDoc, collection, getDocs, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card.jsx";
import Graph from "../components/Graph/Graph.jsx";
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

  // console.log("Current Transactions", transactions);

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
  const submitValues = (values) => {
    console.log("Value submitted", values);

    const newTransaction = {
      type: values.type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    console.log("newTransaction", newTransaction);

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  };

  // Adding transaction to database
  async function addTransaction(transaction, many = false) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );

      console.log("Document written with ID: ", docRef.id);

      if (!many) {
        toast.success("Transaction Added!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);

      if (!many) {
        toast.error("Couldn't add transaction");
      }
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

  // Calculate the initial balance, income, and expenses
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const resetBalance = () => {};

  // getting all firebase docs
  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <Loader />;
  } else
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
            <div className="my-12 w-full h-[500px] flex gap-[5%]">
              <div className="box-shadow rounded-sm w-[60%]">
                <Graph />
              </div>

              <div className="box-shadow rounded-sm w-[35%]">
                <PieChart />
              </div>
            </div>
          )}



          {/* My Transactions */}
          <div className="flex flex-col p-8 mt-4 mb-16 box-shadow">
              <Table transactions={transactions} />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
