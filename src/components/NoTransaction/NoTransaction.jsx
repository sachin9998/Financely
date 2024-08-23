import emptyTransactionCard from "../../assets/transactions.svg";

const NoTransaction = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-between my-10">
      <img width={300} src={emptyTransactionCard} alt="" />
      <p>You Have No Transactions Currently</p>
    </div>
  );
};

export default NoTransaction;
