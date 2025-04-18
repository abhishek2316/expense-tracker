import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
// import { expenseLineChartData } from "../../../utils/helper";
import { expenseLineChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = expenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">Track your spendings.</p>
        </div>
        <button
          className="add-btn flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
