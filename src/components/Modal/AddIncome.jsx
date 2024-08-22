import React from "react";

const AddIncome = () => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-medium">Add Income</h2>
      </div>

      <div>
        <p className="font-medium">
          <sup className=" text-red-600"> * </sup>Name
        </p>
        <input type="text" />
      </div>

      <div>
        <p>
          <sup className=" text-red-600"> * </sup>Amount
        </p>
        <input type="number" />
      </div>

      <div className="">
        <p>
          <sup className=" text-red-600"> * </sup>Date
        </p>
        <input type="date" name="" id="" size="12" />
      </div>

      <div>
        <p>
          <sup className=" text-red-600"> * </sup>Tag
        </p>
      </div>

      <div>
        <button className="bg-[var(--theme)] text-white px-8 py-2 rounded hover:bg-white hover:text-[var(--theme)] hover:border hover:border-[var(--theme)] transition-all">
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
