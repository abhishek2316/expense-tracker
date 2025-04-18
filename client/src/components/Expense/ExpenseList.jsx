import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="col-span-2 card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-medium">All Expenses</h5>

        <button
          className="card-btn flex items-center gap-2 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition-colors"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> 
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date || expense.createdAt).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          /> 
        ))}
      </div>
    </div>
  )
}

export default ExpenseList