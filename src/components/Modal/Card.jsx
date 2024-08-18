const Card = ({ title }) => {
  return (
    <div className="w-[380px] p-6 box-shadow rounded">
      <h2 className="text-xl font-medium tracking-wide">{title}</h2>
      <p className="py-3 text-sm tracking-widest">₹55000</p>
      <button className="bg-[var(--theme)] text-white py-[8px] w-full rounded font-light text-sm outline-none">
        Reset Balance
      </button>
    </div>
  );
};

export default Card;
