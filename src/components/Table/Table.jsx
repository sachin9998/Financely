import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Table = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("All");

  console.log(transactions);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    setSearch(query);

    // const searchData = data.filter((item) =>
    //   item.name.toLowerCase().includes(query)
    // );

    if (query !== "") {
      const searchData = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(searchData);
    } else {
      setData(transactions);
    }
  };

  const handleFilterBtn = (e) => {
    let filterOption = e.target.value;
    let newData = transactions.filter((item) => {
      if (filterOption === "income") {
        return item.type === "income";
      } else if (filterOption === "expense") {
        return item.type === "expense";
      }
      return true;
    });
    setData(newData);
  };

  const applySort = () => {
    let sortedData = [...transactions];
    if (sortOption === "date") {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "amount") {
      sortedData.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === "noSort") {
      // Do nothing to retain original order
    }
    setData(sortedData);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    applySort();
  };

  useEffect(() => {}, [data, transactions]);

  return (
    <>
      <div className="my-2 flex justify-between items-center">
        <h2 className="text-2xl font-medium tracking-wide">My Transactions</h2>

        <div className="flex items-center gap-4">
          {/* <button className="border p-2 text-sm border-blue-500">
            No Sort
          </button>
          <button className="border p-2 text-sm">Sort By Date</button>
          <button className="border p-2 text-sm">Sort by Amount</button> */}

          <label className="border p-2">
            <input
              type="radio"
              name="sortOption"
              value="noSort"
              checked={sortOption === "noSort"}
              onChange={handleSort}
            />
            No Sort
          </label>
          <label>
            <input
              type="radio"
              name="sortOption"
              value="date"
              checked={sortOption === "date"}
              onChange={handleSort}
            />
            Sort By Date
          </label>
          <label>
            <input
              type="radio"
              name="sortOption"
              value="amount"
              checked={sortOption === "amount"}
              onChange={handleSort}
            />
            Sort By Amount
          </label>
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

      <div className="w-full my-8 flex items-center justify-center gap-6 text-sm">
        <div className="flex-1 box-shadow flex gap-4 items-center space-between px-3 py-2 rounded-md outline-none border-none">
          <FiSearch className="" />
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="Search by Name"
            value={search}
            onChange={handleSearch}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="box-shadow w-[20%] py-2 px-3 rounded-md">
          <select className="w-full" onChange={(e) => handleFilterBtn(e)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

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
          {data.map((item, index) => {
            return (
              <tr key={Date.now() + index} className="border-b">
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>₹{item.amount}</td>
                <td>{item.tag}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-5 flex justify-end gap-2">
        <button className="border p-1 w-[32px]">
          <IoIosArrowBack />
        </button>
        <button className="border border-[var(--theme)] p-1 w-[32px]">1</button>
        <button className="border p-1 w-[32px]">
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default Table;
