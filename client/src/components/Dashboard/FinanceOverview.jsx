import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
// import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const balanceData = [
        {
            name:"Total Balance", amount:totalBalance
        },
        {
            name:"Total Income", amount:totalIncome
        },
        {
            name:"Total Expense", amount:totalExpense
        }
    ];
  return <div className="card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
    <div className="flex items-center justify-center">
        <h5 className="text-lg">Financial Overview</h5>
    </div>

    <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
    /> 
  </div>
};

export default FinanceOverview;