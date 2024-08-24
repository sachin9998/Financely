import { unparse } from "papaparse";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// const [query, setQuery] =useState("");

const Table = ({ transactions, importFromCSV }) => {
  const [data, setData] = useState(transactions);
  const [search, setSearch] = useState("");
  //   const [sortOption, setSortOption] = useState("");
  const [selectedButton, setSelectedButton] = useState("button1");

  console.log(transactions);

  const handleSearch = (e) => {
    // const query = e.target.value.toLowerCase();
    const q = e.target.value;
    setSearch(q);

    const query = q.toLowerCase();

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

  const applySort = (sortOption) => {
    let sortedData = [...transactions];
    if (sortOption === "date") {
      sortedData.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === "amount") {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "noSort") {
      // Do nothing to retain original order
    }
    setData(sortedData);
  };

  //   const handleSort = (e) => {
  //     setSortOption(e.target.value);
  //     applySort();
  //   };

  const handleClick = (buttonId, sortOption) => {
    setSelectedButton(buttonId);
    applySort(sortOption);
  };

  // Define styles for buttons
  const buttonStyle = (buttonId) => ({
    border: selectedButton === buttonId ? "1px solid #40a9ff" : "",
    color: selectedButton === buttonId ? "#40a9ff" : "",
    padding: "4px 8px",
    // margin: "5px",
    cursor: "pointer",
  });

  const exportToCSV = () => {
    var csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {}, [data, search]);

  return (
    <>
      <div className="my-2 flex justify-between items-center">
        <h2 className="text-2xl font-medium tracking-wide">My Transactions</h2>

        <div className="flex text-sm shadow-sm">
          <button
            className="border"
            style={buttonStyle("button1")}
            onClick={() => handleClick("button1", "noSort")}
          >
            No Sort
          </button>
          <button
            className="border"
            style={buttonStyle("button2")}
            onClick={() => handleClick("button2", "amount")}
          >
            Sort by Date
          </button>
          <button
            className="border"
            style={buttonStyle("button3")}
            onClick={() => handleClick("button3", "date")}
          >
            Sort by Amount
          </button>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={exportToCSV}
            className="border border-[var(--theme)] text-[var(--theme)] px-8 py-2 rounded hover:bg-[var(--theme)] hover:text-white hover:border transition-all"
          >
            Export to CSV
          </button>

          {/* <button
            onClick={importFromCSV}
            className="bg-[var(--theme)] text-white px-8 py-2 rounded border border-transparent hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all"
          ></button> */}

          <label
            htmlFor="file-csv"
            className="inline-flex border border-[var(--theme)] text-white bg-[var(--theme)] px-8 py-2 rounded hover:text-[var(--theme)] hover:bg-white transition-all"
          >
            Import from CSV
          </label>
          <input
            className=" hidden"
            type="file"
            id="file-csv"
            accept=".csv"
            required
            onChange={importFromCSV}
          />
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

        <tbody className="t text-gray-700">
          {data.length === 0 && (
            <tr className="border">
              <td className="text-center font-medium" colSpan={5}>
                No Transactions Found
              </td>
            </tr>
          )}

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

      {/* For Future use: Pagination */}
      {/* <div className="mt-5 flex justify-end gap-2">
        <button className="border p-1 w-[32px]">
          <IoIosArrowBack />
        </button>
        <button className="border border-[var(--theme)] p-1 w-[32px]">1</button>
        <button className="border p-1 w-[32px]">
          <IoIosArrowForward />
        </button>
      </div> */}
    </>
  );
};

export default Table;
