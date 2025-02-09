import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../redux/slices/transactionsSlice";

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  return (
    <>
      <ul className="list-none p-0 my-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex justify-between items-center bg-white shadow-md p-3 rounded-md my-2 border-r-4 ${
              transaction.amount < 0 ? "border-red-500" : "border-green-500"
            }`}
          >
            {transaction.text} <span>${transaction.amount} </span>
            <p className="text-gray-500 text-xs">{transaction.category}</p>
            <button
              onClick={() => dispatch(deleteTransaction(transaction.id))}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
