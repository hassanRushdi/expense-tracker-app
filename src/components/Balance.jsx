import React from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const transactions = useSelector((state)=> state.transactions.transactions);
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  return (
    <div className="text-center my-4">
      <h4 className="text-lg font-semibold">Your Balance</h4>
      <h1 className="text-3xl font-bold">${total.toFixed(2)}</h1>
    </div>
  );
};

export default Balance;
