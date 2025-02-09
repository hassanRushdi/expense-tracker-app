import React from "react";
import { useSelector } from "react-redux";

const IncomeExpenses = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  return (
    <div className="flex justify-between bg-white shadow-md p-4 rounded-md my-4">
      <div className="text-center flex-1 border-r border-gray-300">
        <h4 className="uppercase font-semibold">Income</h4>
        <p className="text-green-500 font-bold text-lg">+${income.toFixed(2)}</p>
      </div>
      <div className="text-center flex-1">
        <h4 className="uppercase font-semibold">Expense</h4>
        <p className="text-red-500 font-bold text-lg">-${expenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
