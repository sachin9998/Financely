const Card = ({ title, btnText, openModal }) => {
  return (
    <div className="w-[380px] p-6 box-shadow rounded">
      <h2 className="text-xl font-medium tracking-wide">{title}</h2>

      <p className="py-3 text-sm tracking-widest">₹55000</p>

      <button
        onClick={openModal}
        className="bg-[var(--theme)] text-white py-[8px] w-full rounded font-light text-sm outline-none border transition-all hover:border hover:border-[var(---theme)] hover:bg-white hover:text-[var(--theme)]"
      >
        {btnText}
      </button>
    </div>
  );
};

export default Card;
