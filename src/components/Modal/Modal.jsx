import { useState } from "react";
import { TfiClose } from "react-icons/tfi";

const incomeTags = [
  "Salary",
  "Freelance",
  "Investment",
  "Rental Income",
  "Other Income",
];

const expenseTags = ["Rent", "Food", "Bills", "Miscellaneous"];

const Modal = ({ title, isModalOpen, closeModal, submitValues, type }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(Date.now());
  const [tag, setTag] = useState("");
  // const type = type;

  const values = {
    type: type,
    date: date,
    amount: amount,
    tag: tag,
    name: name,
  };

  const submitForm = (e, values) => {
    e.preventDefault();
    console.log(values);
    submitValues(values);
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="text-sm fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-90 bg-transparent flex items-center justify-center z-[1000] p-5 md:p-0"
      onClick={closeModal}
    >
      <div
        className="max-w-[500px] w-full bg-white rounded box-shadow relative px-6 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button absolute top-4 right-4 bg-none border-none cursor-pointer"
          onClick={closeModal}
        >
          <TfiClose size={18} />
        </button>

        <h2 className="pb-2 text-xl font-medium border-b">{title}</h2>

        <form
          className="flex flex-col gap-6 mt-5 "
          onSubmit={(e) => submitForm(e, values)}
        >
          <div>
            <p className="font-medium">
              <sup className=" text-red-600"> * </sup>Name
            </p>
            <input
              className="outline-none py-1 border-b w-full border-black"
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Details"
            />
          </div>

          <div>
            <p className="font-medium">
              <sup className=" text-red-600"> * </sup>Amount
            </p>
            <input
              className="outline-none py-1 border-b w-full border-black"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
              type="number"
              placeholder="Enter Amount"
            />
          </div>

          <div>
            <p className="font-medium">
              <sup className=" text-red-600"> * </sup>Date
            </p>
            <input
              className="outline-none py-1 border-b w-full border-gray-300"
              type="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <p className="font-medium">
              <sup className=" text-red-600"> * </sup>Tag
            </p>
            <select
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              required
              className="py-1 w-full border-b border-black"
            >
              <option value="" disabled>
                Select a tag
              </option>
              {type === "income"
                ? incomeTags.map((item, idx) => {
                    return (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    );
                  })
                : expenseTags.map((item, idx) => {
                    return (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    );
                  })}
            </select>
          </div>

          <button
            type="submit"
            className="bg-[var(--theme)] text-white px-8 py-2 rounded hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all w-full"
          >
            {type === "income" ? "Add Income" : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
