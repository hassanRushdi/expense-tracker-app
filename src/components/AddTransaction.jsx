import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const transactionSchema = z.object({
  text: z.string().min(1, "Text is required"),
  amount: z.string()
    .min(1, "Amount is required")
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .min(-10000, "Amount cannot be less than -10,000")
        .max(10000, "Amount cannot be greater than 10,000")
        .refine((val) => val !== 0, "Amount cannot be zero")
    ),
  category: z.string().optional(),
});

const AddTransaction = () => {
  // const [text, setText] = useState("");
  // const [amount, setAmount] = useState(0);
  // const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      text: "",
      amount: "",
      category: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // e.preventDefault();
    // if (!text || !amount) return;
    dispatch(
      addTransaction({
        text: data.text,
        amount: data.amount,
        category: data.category,
      })
    );

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md p-4 rounded-md"
    >
      <h3 className="text-lg font-semibold mb-2">Add Transaction</h3>
      <input
        type="text"
        // value={text}
        // onChange={(e) => setText(e.target.value)}
        {...register("text")}
        placeholder="Enter text..."
        className="w-full p-2 border rounded my-2"
      />
      {errors.text && <p className="text-red-500">{errors.text.message}</p>}
      <input
        type="number"
        // value={amount}
        // onChange={(e) => setAmount(e.target.value)}
        {...register("amount")}
        placeholder="Enter amount..."
        className="w-full p-2 border rounded my-2"
      />
      {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      <input
        type="text"
        // value={category}
        // onChange={(e) => setCategory(e.target.value)}
        {...register("category")}
        placeholder="Enter category..."
        className="w-full p-2 border rounded my-2"
      />
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}
      <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-700">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
