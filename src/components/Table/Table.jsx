import { unparse } from "papaparse";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Table = ({ transactions, importFromCSV }) => {
  const [data, setData] = useState(transactions);
  const [search, setSearch] = useState("");
  const [selectedButton, setSelectedButton] = useState("button1");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query !== "") {
      const searchData = data.filter((item) =>
        item.name.toLowerCase().includes(query)
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
    }
    setData(sortedData);
  };

  const handleClick = (buttonId, sortOption) => {
    setSelectedButton(buttonId);
    applySort(sortOption);
  };

  const buttonStyle = (buttonId) => ({
    border: selectedButton === buttonId ? "1px solid #40a9ff" : "",
    color: selectedButton === buttonId ? "#40a9ff" : "",
    padding: "4px 8px",
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
      <div className="my-2 flex flex-col sm:flex-row gap-5 justify-between items-center">
        <h2 className=" text-xl md:text-2xl font-medium tracking-wide py-2">
          My Transactions
        </h2>
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

        <div className="flex sm:justify-center justify-evenly items-center gap-4 text-sm font-normal">
          <button
            onClick={exportToCSV}
            className="border border-[var(--theme)] text-[var(--theme)] px-3 sm:px-8 py-1 sm:py-2 rounded hover:bg-[var(--theme)] hover:text-white hover:border transition-all"
          >
            Export to CSV
          </button>
          <label
            htmlFor="file-csv"
            className="inline-flex border border-[var(--theme)] text-white bg-[var(--theme)] px-3 sm:px-8 py-1 sm:py-2 rounded hover:text-[var(--theme)] hover:bg-white transition-all"
          >
            Import from CSV
          </label>
          <input
            className="hidden"
            type="file"
            id="file-csv"
            accept=".csv"
            required
            onChange={importFromCSV}
          />
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full my-3 md:my-8 flex items-center justify-center gap-1 sm:gap-6 text-sm">
        <div className="flex-1 box-shadow flex gap-4 items-center px-2 py-1 md:px-3 md:py-2 mx-2 md:mx-0 rounded-md outline-none border-none">
          <FiSearch />
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="Search by Name"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="box-shadow sm:w-[20%] mx-2 md:mx-0 px-2 py-1 md:px-3 md:py-2 rounded-md">
          <select
            className="w-full bg-transparent text-xs md:text-sm"
            onChange={(e) => handleFilterBtn(e)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* <div className="overflow-auto hidden sm:block">
        <table className="w-full text-start text-xs md:text-sm sm:text-[14px]">
          <thead className="border">
            <tr className="">
              <th className="px-2 py-2 md:py-4 text">Name</th>
              <th className="px-2 py-2 md:py-4">Type</th>
              <th className="px-2 py-2 md:py-4">Date</th>
              <th className="px-2 py-2 md:py-4">Amount</th>
              <th className="px-2 py-2 md:py-4 hidden">Tag</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {data.length === 0 && (
              <tr className="border">
                <td className="text-center font-medium" colSpan={5}>
                  No Transactions Found
                </td>
              </tr>
            )}

            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-2  md:py-4 text-xs md:text-sm">
                  {item.name}
                </td>
                <td className="px-2 py-2  md:py-4 text-xs md:text-sm whitespace-nowrap">
                  {item.type}
                </td>
                <td className="px-2 py-2  md:py-4 text-[9px] md:text-sm whitespace-nowrap">
                  {item.date}
                </td>
                <td className="px-2 py-2  md:py-4 text-xs md:text-sm whitespace-nowrap">
                  ₹{item.amount}
                </td>
                <td className="px-2 py-2  md:py-4 text-xs md:text-sm hidden whitespace-nowrap">
                  {item.tag}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <table className="mt-5 md:mt-2 w-full table-auto text-xs md:text-sm md:tracking-wide">
        <thead>
          <tr className="border">
            <th className="px-2 py-2 md:py-4 text-left ">Name</th>
            <th className="px-2 py-2 md:py-4 text-left">Type</th>
            <th className="px-2 py-2 md:py-4 text-left">Date</th>
            <th className="px-2 py-2 md:py-4 text-left">Amount</th>
            <th className="px-2 py-2 md:py-4 text-left hidden">Tag</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="border-b" key={Date.now() + index}>
                <td className="px-2 py-2 text-gray-700 md:py-4">{item.name}</td>
                <td className="px-2 py-2 text-gray-700">{item.type}</td>
                <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="px-2 py-2 text-gray-700">₹{item.amount}</td>
                <td className="px-2 py-2 text-gray-700 hidden">{item.tag}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
